require("dotenv").config();

//http dependencies
const express = require("express");

const http = require("http");



// ethereum dependencies
const ethers = require("ethers");
const { parseUnits, formatUnits } = ethers.utils;


// SERVER CONFIG
//const PORT = process.env.PORT || 5000;
//const app = express();


// ETHERS CONFIG
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Contracts
const uniswapV2 = new ethers.Contract(
  process.env.UNISWAPV2_ROUTER_ADDRESS,
  [
    "function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts)",
    "function WETH() external pure returns (address)",
  ],
  provider
);

const sushiswap = new ethers.Contract(
  process.env.SUSHISWAP_ADDRESS,
  [
    "function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts)",
    "function WETH() external pure returns (address)",
  ],
  provider
);

const shibaswap = new ethers.Contract(
  process.env.SHIBASWAP_ADDRESS,
  [
    "function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts)",
    "function WETH() external pure returns (address)",
  ],
  provider
);

const sakeswap = new ethers.Contract(
  process.env.SAKESWAP_ADDRESS,
  [
    "function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts)",
    "function WETH() external pure returns (address)",
  ],
  provider
);

const croswap = new ethers.Contract(
  process.env.CROSWAP_ADDRESS,
  [
    "function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts)",
    "function WETH() external pure returns (address)",
  ],
  provider
);

async function checkPair(args) {
  const {
    inputTokenSymbol,
    inputTokenAddress,
    outputTokenSymbol,
    outputTokenAddress,
    inputAmount,
  } = args;

  //calculate uniswap amount
  const path = [inputTokenAddress, outputTokenAddress];
  const amounts = await uniswapV2.getAmountsOut(inputAmount, path);
  const uniswapAmount = amounts[1];

  // calculate sushiswap amount
  const path1 = [inputTokenAddress, outputTokenAddress];
  const amounts1 = await sushiswap.getAmountsOut(inputAmount, path1);
  const sushiswapAmount = amounts1[1];

  // calculate shibaswap amount
  const path2 = [inputTokenAddress, outputTokenAddress];
  const amounts2 = await shibaswap.getAmountsOut(inputAmount, path2);
  const shibaswapAmount = amounts2[1];

  // calculate sakeswap amount
  const path3 = [inputTokenAddress, outputTokenAddress];
  const amounts3 = await sakeswap.getAmountsOut(inputAmount, path3);
  const sakeswapAmount = amounts3[1];

  // calculate croswap amount
  const path4 = [inputTokenAddress, outputTokenAddress];
  const amounts4 = await croswap.getAmountsOut(inputAmount, path4);
  const croswapAmount = amounts4[1];

  console.table([
    {
      'Input Token': inputTokenSymbol,
      'Output Token': outputTokenSymbol,
      "Input Amount": formatUnits(inputAmount, 18),
      "Uniswap Return": formatUnits(uniswapAmount, 18),
      "Sushiswap Return": formatUnits(sushiswapAmount, 18),
      "Shibaswap Return": formatUnits(shibaswapAmount, 18),
      "Sakeswap Return": formatUnits(sakeswapAmount, 18),
      "Croswap Return": formatUnits(croswapAmount, 18),

      //'Timestamp': moment().tz('America/Chicago').format(),
    },
  ]);
}

let priceMonitor;
let monitoringPrice = false;

async function monitorPrice() {
  if (monitoringPrice) {
    return;
  }

  console.log("Checking prices...");
  monitoringPrice = true;

  try {
    await checkPair({
      inputTokenSymbol: "WETH",
      inputTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      outputTokenSymbol: "DAI",
      outputTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
      inputAmount: parseUnits("1", 18),
    });
  } catch (error) {
    console.error(error);
    monitoringPrice = false;
    clearInterval(priceMonitor);
    return;
  }

  monitoringPrice = false;
}

// Check markets every n seconds
const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 3000; // 3 Seconds
priceMonitor = setInterval(async () => {
  await monitorPrice();
}, POLLING_INTERVAL);
