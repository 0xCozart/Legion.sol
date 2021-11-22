import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ethers } from "hardhat";
import { Legion, Legion__factory } from "../typechain";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Legion", () => {
  let legion: Legion;
  let signers: SignerWithAddress[];
  const mintPrice = ethers.utils.parseEther("0.069");

  before(async () => {
    signers = await ethers.getSigners();

    const legionFactory = (await ethers.getContractFactory(
      "Legion",
      signers[0]
    )) as Legion__factory;

    legion = await legionFactory.deploy();

    await legion.deployed();

    expect(await legion.name()).to.eq("Legion");
    expect(await legion.symbol()).to.eq("LGN");
  });

  it("should mint 1 Legion", async () => {
    const amountMinted = ethers.BigNumber.from(1);

    await legion.safeMint(amountMinted, {
      value: mintPrice,
    });

    expect(await legion.ownerToTokenAmount(signers[0].address)).to.eq(
      amountMinted
    );
  });
});
