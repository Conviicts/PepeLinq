import { expect } from "chai";
import { ethers } from "hardhat";
import * as web3 from "web3";
const { toWei, toBigInt } = web3.utils;


describe("PepeLinq", function () {
	let tokenInstance: any;
	let owner: any;
	let user: any;

	before(async () => {
		// accounts
		owner = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
		user = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

		// instances
		const PPLQContract = await ethers.getContractFactory("PepeLinq");
		tokenInstance = await PPLQContract.deploy(owner);
	});

	describe("Deployment", function () {
		it("Should have 10000000000 PPLQ", async function () {
			const expected = 10000000000n * (10n ** 18n);

			expect(await tokenInstance.balanceOf(owner)).to.equal(expected);
		});

		// it("Should whitelist", async function () {
		// 	await tokenInstance.whitelist(user);
			
		// 	expect(true).to.equal(true);
		// });

		// it("Should transfer tokens to user", async function () {
		// 	const transferAmount = web3.utils.toWei('0.5', 'ether');
		
		// 	const userBalanceBefore = await tokenInstance.balanceOf(user);
		
		// 	await tokenInstance.transfer("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", transferAmount);
		// 	const userBalanceAfter = await tokenInstance.balanceOf(user);
		
		// 	expect(userBalanceAfter.toString()).to.equal((BigInt(userBalanceBefore) + BigInt(transferAmount)).toString());
		// });
	});
});
