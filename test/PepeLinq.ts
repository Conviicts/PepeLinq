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
		[owner, user] = await ethers.getSigners();

        // instances
        const PPLQContract = await ethers.getContractFactory("PepeLinq");
        tokenInstance = await PPLQContract.deploy(owner.address);
	});

	describe("Deployment", function () {
		it("Should have 10000000000 PPLQ", async function () {
			const expected = 10000000000n * (10n ** 18n);

			expect(await tokenInstance.totalSupply()).to.equal(expected);
		});

		it("Should not allow transferring from non-whitelisted address", async function () {
			const amount = toWei('2', 'ether');
			const result = tokenInstance.connect(owner).transfer(user, amount);

			await expect(result).to.be.revertedWith("PepeLinq: sender or recipient not in whitelist");
		});


		it("Should allow transferring from whitelisted address", async function () {
			const amount = toWei('2', 'ether');
			const value = BigInt(amount);

			await tokenInstance.connect(owner)
			await tokenInstance.whitelist(user);
			await tokenInstance.transfer(user, amount, { from: owner });
			expect(await tokenInstance.balanceOf(user)).to.equal(value - (value / 100n));
		});
	});
});