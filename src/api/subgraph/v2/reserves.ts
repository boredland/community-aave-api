import { gql } from "graphql-request";

const RESERVE_FRAGMENT = gql`
  fragment ReserveItem on Reserve {
    id
    symbol
    decimals
    totalLiquidity
    liquidityRate
    variableBorrowRate
    stableBorrowRate
    stableBorrowRateEnabled
    availableLiquidity
    lastUpdateTimestamp
    liquidityIndex
    variableBorrowIndex
    lifetimeFlashLoans
    lifetimeLiquidated
    lifetimeFlashloanProtocolFee
    lifetimeFeeCollected
    totalScaledVariableDebt
    totalPrincipalStableDebt
    averageStableRate
    stableDebtLastUpdateTimestamp
    flashLoanHistory(orderBy: amount, orderDirection: desc, first: 1) {
      id
      amount
    }
    price {
      id
      priceInEth
    }
    pool {
      id
    }
  }
`;

export const RESERVES = gql`
  query ReservesQuery {
    priceOracle(id: 1) {
      id
      usdPriceEth
      lastUpdateTimestamp
    }
    reserves(orderBy: liquidityRate, orderDirection: desc) {
      ...ReserveItem
    }
  }
  ${RESERVE_FRAGMENT}
`;
