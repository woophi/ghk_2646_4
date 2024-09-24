export const calculatePayment = (principal: number, interestRate: number, term: number) => {
  const monthlyInterestRate = interestRate / 12;
  const exponent = Math.pow(1 + monthlyInterestRate, term);

  return Math.ceil((principal * monthlyInterestRate * exponent) / (exponent - 1));
};
