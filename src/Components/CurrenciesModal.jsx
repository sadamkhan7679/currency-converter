import Modal from "react-modal";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
import React, { Fragment, useState } from "react";
import ds2 from "../images/ds2.png";
Modal.setAppElement("#root");

export default function CurrenciesModal({
  currencies = [],
  selectedCurrencies = [],
  handleCurrencySelect,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Create an alphabet list for quick navigation
  const alphabet = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(65 + i),
  );

  const handleModalCurrencySelect = (currency) => {
    console.log(`Selected currency: ${currency}`);
    handleCurrencySelect(currency);
    handleCloseModal();
    setSearchQuery("");
  };

  const getFilteredCurrencies = () => {
    if (!searchQuery) {
      return currencies;
    }

    return currencies.filter(
      ({ code, name }) =>
        code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  return (
    <Fragment>
      {/* Add Currency Button */}
      <div className="add-button">
        <button className="add-currency" onClick={handleOpenModal}>
          <FaPlus /> Add currency
        </button>
        <img src={ds2} alt="Icon" className="currency-icon" />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Currency List"
        className="currency-modal"
        overlayClassName="currency-modal-overlay"
      >
        <div className="modal-header">
          <h2>Select Currency</h2>
          <FaTimes className="close-modal" onClick={handleCloseModal} />
        </div>
        <div className="alphabet-list-main">
          <div className="alphabet-list">
            {alphabet.map((letter) => (
              <a href={`#${letter}`} key={letter} className="alphabet-letter">
                {letter}
              </a>
            ))}
          </div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Grouped Currency List */}
        <div className="currency-list">
          {alphabet.map((letter) => {
            const currenciesList = getFilteredCurrencies().filter((currency) =>
              currency.code.startsWith(letter),
            );

            // console.log(currenciesList);

            if (!currenciesList.length) {
              return null;
            }

            return (
              <div key={letter} id={letter}>
                <h3>{letter}</h3>
                {currenciesList.map(({ code, name }) => (
                  <div
                    key={code}
                    className="currency-item"
                    onClick={() => handleModalCurrencySelect(code)}
                  >
                    <div className="currency-info">
                      <img
                        src={`https://flagsapi.com/${code.slice(0, 2)}/flat/32.png`}
                        alt={`${code} flag`}
                        className="currency-flag"
                      />
                      <span className="currency-name">
                        {code} - {name}
                      </span>

                      {/* Show checkmark if this currency is selected */}
                      {selectedCurrencies.some((item) => item === code) && (
                        <FaCheck className="currency-check" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {/*{Object.entries(getAlphabeticallyGroupedCurrencies()).map(*/}
          {/*  ([letter, currencies]) => (*/}
          {/*    <div key={letter} id={letter}>*/}
          {/*      <h3>{letter}</h3>*/}
          {/*      {currencies.map(({ code, name }) => (*/}
          {/*        <div*/}
          {/*          key={code}*/}
          {/*          className="currency-item"*/}
          {/*          onClick={() => handleModalCurrencySelect(code)}*/}
          {/*        >*/}
          {/*          <div className="currency-info">*/}
          {/*            <img*/}
          {/*              src={`https://flagsapi.com/${code.slice(0, 2)}/flat/32.png`}*/}
          {/*              alt={`${code} flag`}*/}
          {/*              className="currency-flag"*/}
          {/*            />*/}
          {/*            <span className="currency-name">*/}
          {/*              {code} - {name}*/}
          {/*            </span>*/}

          {/*            /!* Show checkmark if this currency is selected *!/*/}
          {/*            {selectedCurrencies.some(*/}
          {/*              (item) => item.currency === code,*/}
          {/*            ) && <FaCheck className="currency-check" />}*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*  ),*/}
          {/*)}*/}
        </div>
      </Modal>
    </Fragment>
  );
}
