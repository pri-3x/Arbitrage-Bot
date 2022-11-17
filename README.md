# Arbitrage-Bot

To run the project run the following commands:

1)Clone the repo: git clone: https://github.com/pri-3x/Arbitrage-Bot.git

2) Change the name of the ".env.example" file to ".env". Since ".env" file is not supported by the github.

3) "npm install": to install all the dependencies used in the project.

 After the node modules are installed

4) "npm start": to start the project.

Description about the project:
This is an arbitrage bot which swaps WETH token TO DAI token by fetching real time price of both the tokens on multiple exchanges such as Uniswap, Sushiswap, Sakeswap, Shibaswap and Croswap. This bot captures the real time swap and displays the resultant on the console log. I have used Infura as a RPC Node provider, Node.js as a backend lanaguage and Ether.js library for connecting to Ethereum nodes over JSON-RPC and INFURA. The real time prices on multiple exchanges will be fetched every 3 seconds.

Contracts used:
UniswapV2 Router02, SakeSwapRouter, CroDefiSwapRouter02.



![Screenshot (330)](https://user-images.githubusercontent.com/53579127/202237731-a9d722d1-7491-4fdf-8dd5-bdd8dd30671b.png)
