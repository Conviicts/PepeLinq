import { ethers } from "hardhat";

async function main() {
	const owner = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

	const contract = await ethers.deployContract("PepeLinq", [owner]);

	await contract.waitForDeployment();

	console.log(
		`${contract.target} deployed.`
	);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
