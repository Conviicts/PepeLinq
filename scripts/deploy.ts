import { ethers } from "hardhat";

async function main() {

	const contract = await ethers.deployContract("PepeLinq");

	await contract.waitForDeployment();

	console.log(
		`${contract.target} deployed.`
	);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
