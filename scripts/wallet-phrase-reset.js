const fs = require('fs');

const PLACEHOLDER = 'WALLET_PHRASE_REPLACE_ME';

(() => {
  const files = [
    `${__dirname}/../android/app/src/androidTest/java/com/bitpay/wallet/TestConfig.kt`,
    `${__dirname}/../ios/BitPayAppUITests/TestConfig.swift`,
  ];

  // Matches the string value assigned to the wallet-phrase constant in either
  // the Kotlin (`WALLET_PHRASE`) or Swift (`walletPhrase`) TestConfig file,
  // regardless of what the current value is.
  const assignmentRegex = /(WALLET_PHRASE|walletPhrase)(\s*=\s*)"[^"]*"/g;

  files.forEach(file => {
    if (!fs.existsSync(file)) {
      console.log(`Skipped (not found): ${file}`);
      return;
    }
    const content = fs.readFileSync(file, 'utf-8');
    const updated = content.replace(
      assignmentRegex,
      `$1$2"${PLACEHOLDER}"`,
    );
    fs.writeFileSync(file, updated);
  });

  console.log('Wallet phrase successfully reset to placeholder.');
})();
