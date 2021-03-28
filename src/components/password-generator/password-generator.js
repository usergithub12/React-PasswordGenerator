import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import { Select } from "../../ui/select";

import styles from "./password-generator.module.css";

function PasswordGenerator() {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLengthValues = [12, 13, 14, 15, 16];
  const symbols = "!@#$%^&()_+?:{}[]";
  const [result, setResult] = useState("");
  const [passwordLength, setPasswordLength] = useState(passwordLengthValues[0]);
  const [isSymbolUse, setisSymbolUse] = useState(false);
  const [isPasswordCopied, setisPasswordCopied] = useState(false);
  function handlePasswordGenerator() {
    let currentResult = "";
    if (isSymbolUse) {
      chars += symbols;
    }
    for (let i = 0; i < passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      currentResult += chars.substring(randomNumber, randomNumber + 1);
      setResult(currentResult);
    }
  }

  function handleBlur(event) {
    setPasswordLength(event.target.value);
  }

  function handleSymbolsUse() {
    setisSymbolUse(!isSymbolUse);
  }

  function handlePasswordCopy() {
    let timerId = null;
    if (result) {
      navigator.clipboard.writeText(result).then(() => {
        setisPasswordCopied(true);
        timerId = setTimeout(() => {
          setisPasswordCopied(false);
          clearTimeout(timerId);
        }, 2000);
      });
    }
  }

  return (
    <div className={styles["root"]}>
      <h1 className={styles["title"]}>Password Generator</h1>
      <div className={styles["result"]}>
        <Input type="text" readonly={true} defaultValue={result}></Input>
        <button
          className={styles["copy"]}
          onClick={handlePasswordCopy}
        ></button>
        {isPasswordCopied && <span className={styles.copied}>Copied!</span>}
      </div>
      <div className={styles["option"]}>
        <span className={styles["option-name"]}>Password Length</span>
        <Select onBlur={handleBlur} options={passwordLengthValues}></Select>
      </div>
      <div className={styles["option"]}>
        <label className={styles["option-label"]} htmlFor="symbols">
          Use special symbols
        </label>
        <Checkbox
          defaultChecked={false}
          onChange={handleSymbolsUse}
          id="symbols"
        ></Checkbox>
      </div>
      <Button type="button" onClick={handlePasswordGenerator}>
        Generate Password
      </Button>
    </div>
  );
}

export { PasswordGenerator };
