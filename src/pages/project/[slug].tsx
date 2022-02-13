import { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { projectActions } from "../../features/project/projectSlice";
import Container from "../../components/app/layout/Container";
import Image from "next/image";
import loaderCyan from "../../assets/images/loader-cyan.svg";
import Link from "next/link";
import {
  getSocialIcon,
  getProjectPhraseStatusTag2,
  getProjectCountdown,
} from "../../features/project/components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import projectConstants from "../../features/project/components";
import NumberFormat from "react-number-format";
import { Tab } from "@headlessui/react";
import { Tab as ReactTab, TabList, TabPanel, Tabs } from "react-tabs";
import ReactHtmlParser from "react-html-parser";
import { format, isAfter, isBefore } from "date-fns";
import { AiOutlineCheckCircle, AiOutlineArrowDown } from "react-icons/ai";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { recaptchaSiteKey, url } from "../../config/app";
import ReCAPTCHA from "react-google-recaptcha";
import TaskModal from "../../features/project/TaskModal";
import { inWhitelistApproved } from "../../features/project/constants";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import toastConfigs from "../../config/toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BsWallet2 } from "react-icons/bs";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { web3 } from "@project-serum/anchor";
import { usdcPubKey } from "../../config/token";
import * as Yup from "yup";
import { kycVerified } from "../../features/user/constants";
import routes from "../../config/routes";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { getOrCreateAssociatedTokenAccount } from "../../libs/getOrCreateAssociatedTokenAccount";
import { createTransferInstruction } from "../../libs/createTransferInstructions";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);

const ProjectDetail: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.project.app.project);
  const user = useAppSelector((state) => state.user.app.user);
  const whitelistRegistrationInfo = useAppSelector(
    (state) => state.project.app.whitelistRegistrationInfo
  );
  const isRegisteringProject = useAppSelector(
    (state) => state.project.app.isRegisteringProject
  );
  const isPurchasing = useAppSelector(
    (state) => state.project.app.isPurchasing
  );
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [captchaChecked, setCaptchaChecked] = useState<boolean>(false);
  const [userUsdcBalance, setUserUsdcBalance] = useState<number>(0);
  const [userUsdcLimit, setUserUsdcLimit] = useState<number>(0);
  const { connection } = useConnection();
  const { sendTransaction, signTransaction } = useWallet();

  useEffect(() => {
    const { slug } = router.query;
    if (window.location.host === "solab.finance") {
      router.push(`https://solabstaking.co/project/${slug}`);
    }
    dispatch(projectActions.fetchProjectBySlug({ slug: slug as string }));
  }, [router]);

  useEffect(() => {
    if (user && project) {
      dispatch(
        projectActions.appFetchWhitelistRegistrationInfo({
          project: project._id,
          user: user._id,
        })
      );
    } else {
      dispatch(
        projectActions.appFetchWhitelistRegistrationInfo({
          project: "disconnected",
          user: "disconnected",
        })
      );
    }
  }, [user, project]);

  useEffect(() => {
    if (user && connection) {
      connection
        .getParsedTokenAccountsByOwner(new web3.PublicKey(user.walletAddress), {
          mint: new web3.PublicKey(usdcPubKey),
        })
        .then((res) => {
          const usdcBalance =
            res.value[0].account.data.parsed.info.tokenAmount.uiAmount;
          setUserUsdcBalance(usdcBalance);
        });
    }
  }, [user, connection]);

  useEffect(() => {
    if (user) {
      if (user.tier) {
        setUserUsdcLimit(user.tier.usdcLimit);
      } else {
        setUserUsdcLimit(100);
      }
    }
  }, [user]);

  const getTicketsInfo = useCallback(() => {
    if (user) {
      let totalTickets = 0;
      if (user.tier) {
        if (user.tier.hasGuaranteedAllocation) {
          return "Guaranteed Allocation";
        }
        totalTickets += user.tier.lotteryTickets;
      }
      if (whitelistRegistrationInfo) {
        totalTickets += whitelistRegistrationInfo.tickets;
      }
      return totalTickets;
    }
    return 0;
  }, [user, whitelistRegistrationInfo]);

  const getRefLink = useCallback(() => {
    if (user && project) {
      const refParams = JSON.stringify({
        p: project._id,
        u: user._id,
      });
      const encryptedRefData = new Buffer(refParams).toString("base64");
      return `${url}${router.asPath}?ref=${encryptedRefData}`;
    }
    return null;
  }, [project, user]);

  const purchase = useCallback(
    async (usdc: number) => {
      try {
        if (!user || !signTransaction || !sendTransaction) {
          throw new WalletNotConnectedError();
        }
        if (!project) {
          throw new Error("Project not found");
        }
        if (isBefore(new Date(), new Date(project.phrases.sale.startDate))) {
          throw new Error("Sale not started yet");
        }
        if (isAfter(new Date(), new Date(project.phrases.sale.endDate))) {
          throw new Error("Sale ended");
        }
        const toPub = new web3.PublicKey(project.pubKey);
        const mint = new web3.PublicKey(usdcPubKey);
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          new web3.PublicKey(user.walletAddress),
          mint,
          new web3.PublicKey(user.walletAddress),
          signTransaction
        );
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          new web3.PublicKey(user.walletAddress),
          mint,
          toPub,
          signTransaction
        );
        const transaction = new web3.Transaction().add(
          createTransferInstruction(
            fromTokenAccount.address,
            toTokenAccount.address,
            new web3.PublicKey(user.walletAddress),
            (usdc / 1000) * web3.LAMPORTS_PER_SOL,
            [],
            TOKEN_PROGRAM_ID
          )
        );
        const blockHash = await connection.getRecentBlockhash();
        transaction.feePayer = await new web3.PublicKey(user.walletAddress);
        transaction.recentBlockhash = await blockHash.blockhash;
        const signed = await signTransaction(transaction);
        const signature = await connection.sendRawTransaction(
          signed.serialize()
        );
        await connection.confirmTransaction(signature, "processed");
        dispatch(
          projectActions.appPurchase({
            projectId: project._id,
            data: {
              userId: user._id,
              amount: usdc,
            },
          })
        );
      } catch (err: any) {
        toast.error(err.message, toastConfigs.error);
      }
    },
    [user, project, sendTransaction, signTransaction, connection]
  );

  const getYourTicketComponent = useCallback(() => {
    if (user && project) {
      if (isBefore(new Date(), new Date(project.phrases.whitelist.startDate))) {
        return (
          <Tab.Panel className="overflow-x-auto">
            <h3 className="text-xxl text-solabGray-100 mb-8 text-center">
              This project is in preparation
            </h3>
          </Tab.Panel>
        );
      }
      if (
        isAfter(new Date(), new Date(project.phrases.whitelist.startDate)) &&
        isBefore(new Date(), new Date(project.phrases.whitelist.endDate))
      ) {
        return (
          <Tab.Panel className="overflow-x-auto">
            <h3 className="text-xxl text-solabGray-100 mb-8">
              Your total lottery ticket(s):{" "}
              <span className="text-solabWhite-500">{getTicketsInfo()}</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-lg bg-solabGray-300 p-4">
                <h2 className="text-2xl font-bold">Staking</h2>
                {!user.tier ? (
                  <p className="mt-4">You need more LAB to reach Tier 1. </p>
                ) : (
                  <>
                    <p className="mt-4">
                      Your current tier: {user.tier.name}. You will
                      automatically get {user.tier.lotteryTickets} tickets
                    </p>
                    <div className="w-44 h-44 relative p-1 gradient-background-1 rounded-lg mt-4">
                      <div
                        className="bg-solabGray-300 bg-center bg-cover bg-no-repeat w-full h-full rounded-lg p-4"
                        style={{
                          backgroundImage: `url(${user.tier.thumbnail})`,
                        }}
                      ></div>
                    </div>
                  </>
                )}
                <p className="mt-8">
                  Start staking SOLAB to gain more tickets.
                </p>
                <Link href="/staking">
                  <a className="inline-block py-3 text-solabCyan-500 px-7 mt-4 border border-solabCyan-500 rounded">
                    Staking
                  </a>
                </Link>
              </div>
              <div className="rounded-lg bg-solabGray-300 p-4">
                <h2 className="text-2xl font-bold">Social Tasks</h2>
                <p className="mt-4 test-sm">
                  You can collect social ticket by performing various social
                  task:
                </p>
                <div className="mt-4">
                  {project.communityTasks
                    ? project.communityTasks.map((task) => (
                        <div className="flex items-center justify-between text-sm mt-1">
                          <div className="flex items-center pr-2">
                            <div className="p-2 rounded border border-solabGray-50">
                              {getSocialIcon(task.socialType, "h-6 w-6", true)}
                            </div>
                            <span className="ml-2 text-solabGray-100 text-xs sm:text-base">
                              {task.description} :
                              {`${
                                whitelistRegistrationInfo &&
                                whitelistRegistrationInfo.communityTasksDone &&
                                whitelistRegistrationInfo.communityTasksDone.includes(
                                  task.uuid
                                )
                                  ? task.rewardTickets
                                  : 0
                              }/${task.rewardTickets} collected`}
                            </span>
                          </div>
                          {whitelistRegistrationInfo &&
                          whitelistRegistrationInfo.communityTasksDone &&
                          whitelistRegistrationInfo.communityTasksDone.includes(
                            task.uuid
                          ) ? (
                            <div className="p-2 rounded border border-solabCyan-500">
                              <AiOutlineCheckCircle className="h-5 w-5 text-solabCyan-500" />
                            </div>
                          ) : task.userLinkRequired ? (
                            <button
                              className="p-2 rounded border border-solabCyan-500 text-solabCyan-500"
                              onClick={() => {
                                dispatch(projectActions.openTaskModal(task));
                              }}
                            >
                              + {task.rewardTickets}
                            </button>
                          ) : (
                            <Link href={task.url}>
                              <a
                                target="_blank"
                                onClick={() => {
                                  dispatch(
                                    projectActions.appDoCommunityTask({
                                      project: project._id,
                                      data: {
                                        taskUuid: task.uuid,
                                        userId: user._id,
                                      },
                                    })
                                  );
                                }}
                              >
                                <div className="p-2 rounded border border-solabCyan-500 text-solabCyan-500">
                                  + {task.rewardTickets}
                                </div>
                              </a>
                            </Link>
                          )}
                        </div>
                      ))
                    : null}
                  <div className="flex items-center justify-between text-sm mt-1">
                    <div className="flex items-center pr-2">
                      <div className="p-2 rounded border border-solabGray-50">
                        <HiOutlineSpeakerphone className="w-6 h-6 text-solabCyan-500" />
                      </div>
                      <span className="ml-2 text-solabGray-100 text-xs sm:text-base">
                        Invite your friends
                      </span>
                    </div>
                    <button
                      className="inline-block py-2 text-solabCyan-500 px-4 mt-4 border border-solabCyan-500 rounded"
                      onClick={() => {
                        copy(getRefLink() ? (getRefLink() as string) : "");
                        toast.success(
                          "Referral link copied to clipboard",
                          toastConfigs.success
                        );
                      }}
                    >
                      Copy Link
                    </button>
                  </div>
                  <p>
                    You will get 10 tickets when they successfully registered.
                  </p>
                </div>
              </div>
            </div>
          </Tab.Panel>
        );
      }
      if (
        isAfter(new Date(), new Date(project.phrases.whitelist.endDate)) &&
        isBefore(new Date(), new Date(project.phrases.sale.startDate))
      ) {
        return (
          <Tab.Panel className="overflow-x-auto">
            <h3 className="text-xxl text-solabGray-100 mb-8 text-center">
              Whitelist is closed!
            </h3>
          </Tab.Panel>
        );
      }
      if (
        isAfter(new Date(), new Date(project.phrases.sale.startDate)) &&
        isBefore(new Date(), new Date(project.phrases.sale.endDate))
      ) {
        if (
          !whitelistRegistrationInfo ||
          whitelistRegistrationInfo.isInWhiteList !== inWhitelistApproved
        ) {
          return (
            <Tab.Panel className="overflow-x-auto">
              <div className="rounded-lg bg-solabGray-300 p-4 text-center">
                <h3 className="font-bold text-2xl">Result</h3>
                <div className="mt-10 relative w-60 h-48 mx-auto">
                  <Image
                    src="https://solab-media.s3.ap-southeast-1.amazonaws.com/content/empty-box.svg"
                    layout="fill"
                    alt="empty-box"
                  />
                </div>
                <div className="mt-10">
                  <h4 className="text-xl font-bold">
                    Whitelist is closed. Sorry you were unlucky this time
                  </h4>
                  <p className="text-solabGray-100">
                    You can continue to try your luck in the next round
                  </p>
                </div>
              </div>
            </Tab.Panel>
          );
        }
        if (whitelistRegistrationInfo && whitelistRegistrationInfo.bought > 0) {
          return (
            <Tab.Panel className="overflow-x-auto">
              <div className="rounded-lg bg-solabGray-300 p-4 text-center">
                <h3 className="font-bold text-2xl">Result</h3>
                <div className="mt-10">
                  <h4 className="text-xl font-bold">
                    You bought successfully{" "}
                    {whitelistRegistrationInfo.bought / project.idoPrice}{" "}
                    {project.token.symbol}! Tokens will be sent automatically to
                    your wallet.
                  </h4>
                </div>
              </div>
            </Tab.Panel>
          );
        }
        return (
          <Tab.Panel className="overflow-x-auto">
            <div className="rounded-lg bg-solabGray-300 p-4">
              <h3 className="font-bold text-2xl text-center">Result</h3>
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative w-60 h-48 m-auto">
                  <Image
                    src="https://solab-media.s3.ap-southeast-1.amazonaws.com/Success.svg"
                    layout="fill"
                    alt="success"
                  />
                </div>
                <div>
                  <h4 className="text-solabCyan-500 text-xl font-bold">
                    Congratulation! Your address is whitelisted
                  </h4>
                  <p className="text-solabGray-100">
                    You've won an allocation in the{" "}
                    <span className="text-solabWhite-500 font-bold">
                      {project.name}
                    </span>{" "}
                    public sale
                  </p>
                  <div className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                    <span className="text-solabGray-100 text-sm">
                      Token price
                    </span>
                    <span className="text-sm text-solabWhite-500 font-bold">
                      1 {project.token.symbol} = {project.idoPrice} USDC
                    </span>
                  </div>
                  <div className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                    <span className="text-solabGray-100 text-sm">
                      Your total allocation
                    </span>
                    <span className="text-sm text-solabWhite-500 font-bold">
                      {userUsdcLimit} USDC
                    </span>
                  </div>
                  <div className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                    <span className="text-solabGray-100 text-sm">
                      Open time
                    </span>
                    <span className="text-sm text-solabWhite-500 font-bold">
                      {format(
                        new Date(project.phrases.sale.startDate),
                        "MMMM do yyyy, hh:mm a OOOO"
                      )}
                    </span>
                  </div>
                  <div className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                    <span className="text-solabGray-100 text-sm">
                      Close time
                    </span>
                    <span className="text-sm text-solabWhite-500 font-bold">
                      {format(
                        new Date(project.phrases.sale.endDate),
                        "MMMM do yyyy, hh:mm a OOOO"
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="font-bold text-2xl text-center">Swap</h3>
                <div className="mt-6 lg:w-1/2 w-full mx-auto">
                  <Formik
                    initialValues={{
                      usdc: 0,
                      token: 0,
                    }}
                    enableReinitialize
                    validationSchema={Yup.object().shape({
                      usdc: Yup.number()
                        .min(1, "Must be greater than 1")
                        .max(
                          userUsdcLimit,
                          "Must be less than or equal your total allocation"
                        )
                        .required("Required"),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                      await purchase(values.usdc);
                      setSubmitting(false);
                    }}
                  >
                    {({ values, isSubmitting, errors, setFieldValue }) => {
                      return (
                        <Form>
                          <div>
                            <div className="flex font-bold">
                              <div className="relative w-6 h-6">
                                <Image
                                  src="https://solab-media.s3.ap-southeast-1.amazonaws.com/content/usdc-icon.png"
                                  alt="usdc"
                                  layout="fill"
                                />
                              </div>
                              <span className="ml-2">USDC</span>
                            </div>
                            <Field
                              name="usdc"
                              type="number"
                              className="input input-cyan mt-2"
                              max={userUsdcLimit}
                              onChange={(e) => {
                                const usdc = e.target.value;
                                setFieldValue("usdc", usdc);
                                setFieldValue("token", usdc / project.idoPrice);
                              }}
                            />
                            <ErrorMessage
                              name="usdc"
                              render={(msg) => (
                                <span className="text-xs text-red-500">
                                  {msg}
                                </span>
                              )}
                            />
                            <p className="text-sm text-solabGray-100 mt-2 flex gap-2 items-center">
                              <BsWallet2 className="w-4" /> Your balance:
                              <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={userUsdcBalance}
                                displayType="text"
                                thousandSeparator={true}
                                suffix=" USDC"
                                decimalScale={2}
                              />
                            </p>
                          </div>
                          <AiOutlineArrowDown className="w-10 h-10 text-solabCyan-500 mt-4 mx-auto" />
                          <div className="mt-4">
                            <div className="flex font-bold">
                              <div className="relative w-6 h-6">
                                <Image
                                  src={project.token.thumbnail}
                                  alt={project.token.symbol}
                                  layout="fill"
                                  className="rounded-full"
                                />
                              </div>
                              <span className="ml-2 uppercase">
                                {project.token.symbol}
                              </span>
                            </div>
                            <Field
                              name="token"
                              type="number"
                              className="input input-cyan mt-2"
                              onChange={(e) => {
                                const token = e.target.value;
                                setFieldValue("token", parseFloat(token));
                                setFieldValue(
                                  "usdc",
                                  parseFloat(token) * project.idoPrice
                                );
                              }}
                            />
                            <ErrorMessage
                              name="token"
                              render={(msg) => (
                                <span className="text-xs text-red-500">
                                  {msg}
                                </span>
                              )}
                            />
                          </div>
                          <div className="mt-6">
                            <p className="flex text-xs items-center justify-between">
                              <span>Rate</span>
                              <span>
                                1 {project.token.symbol} = {project.idoPrice}
                              </span>
                            </p>
                            <p className="flex text-xs items-center justify-between">
                              <span>Your contribution</span>
                              <span>
                                {values.usdc}/{userUsdcLimit}
                              </span>
                            </p>
                            <p className="flex text-xs items-center justify-between">
                              <span>Contributions</span>
                              <span>
                                {values.token} {project.token.symbol}
                              </span>
                            </p>
                          </div>
                          {user.isKycVerified !== kycVerified ? (
                            <div className="mt-6 text-center">
                              <p className="text-red-500">
                                KYC not yet verified!
                              </p>
                              <Link href={routes.app.myAccount}>
                                <button className="py-3 px-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 w-4/5">
                                  KYC now!
                                </button>
                              </Link>
                            </div>
                          ) : (
                            <div className="mt-6 text-center">
                              {isSubmitting ? (
                                <div className="w-10 h-10 relative mx-auto">
                                  <Image src={loaderCyan} layout="fill" />
                                </div>
                              ) : (
                                <>
                                  <button
                                    type="submit"
                                    className="py-3 font-bold px-4 mt-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 w-full lg:w-9/12"
                                  >
                                    Buy {project.token.symbol}
                                  </button>
                                  <p className="text-sm text-solabGray-100 mt-2">
                                    Minimum contributions amount is 1.00 USDC
                                  </p>
                                </>
                              )}
                            </div>
                          )}
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </Tab.Panel>
        );
      }
      if (isAfter(new Date(), new Date(project.phrases.sale.endDate))) {
        return (
          <Tab.Panel className="overflow-x-auto">
            <div className="rounded-lg bg-solabGray-300 p-4 text-center">
              <h3 className="font-bold text-2xl">Result</h3>
              <div className="mt-10 relative w-60 h-48 mx-auto">
                <Image
                  src="https://solab-media.s3.ap-southeast-1.amazonaws.com/content/empty-box.svg"
                  layout="fill"
                  alt="empty-box"
                />
              </div>
              <div className="mt-10">
                <h4 className="text-xl font-bold">Sale is closed!</h4>
              </div>
            </div>
          </Tab.Panel>
        );
      }
    }
    return (
      <Tab.Panel className="overflow-x-auto">
        <WalletMultiButton className="mx-auto" />
      </Tab.Panel>
    );
  }, [user, project, whitelistRegistrationInfo, userUsdcBalance]);

  return (
    <Container>
      <div className="mt-8 p-4 max-w-7xl mx-auto">
        {project && !project.isTBA ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center">
                  <Image
                    width={80}
                    height={80}
                    src={project.token.thumbnail as string}
                    className="rounded-lg"
                    unoptimized={true}
                  />
                  <h1 className="text-3xl uppercase ml-5">{project.name}</h1>
                </div>
                <p className="mt-4 text-solabGray-100">{project.description}</p>
                <div className="mt-6 flex gap-4">
                  {project.social?.map((item) => (
                    <Link href={item.link}>
                      <a>
                        <div className="w-10 h-10 flex items-center justify-center bg-solabGray-300 rounded">
                          {getSocialIcon(item.socialType, "w-4 h-4")}
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="mt-20 p-4 bg-solabGray-300 rounded-lg">
                  <Swiper
                    style={
                      {
                        "--swiper-navigation-color": "#1EE8BB",
                        "--swiper-pagination-color": "#1EE8BB",
                      } as any
                    }
                    spaceBetween={10}
                    navigation={true}
                    pagination={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    className="mySwiper2"
                    loop={true}
                  >
                    {project.media.map((md) => (
                      <SwiperSlide className="h-48 md:h-72 lg:h-96 rounded-lg">
                        {md.mediaType === projectConstants.mediaTypeImage ? (
                          <div
                            style={{
                              backgroundImage: `url(${md.link})`,
                            }}
                            className="w-full h-full bg-no-repeat bg-cover bg-center rounded-lg"
                          ></div>
                        ) : md.mediaType === projectConstants.mediaTypeVideo ? (
                          <iframe
                            className="w-full h-full rounded-lg"
                            src={md.link}
                            title="YouTube video player"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen={true}
                          ></iframe>
                        ) : (
                          ""
                        )}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className="mySwiper mt-4 mx-auto"
                  >
                    {project.media.map((md) => (
                      <SwiperSlide className="h-12 md:h-14 lg:h-20">
                        <div
                          style={{
                            backgroundImage: `url(${md.thumbnail})`,
                          }}
                          className="w-full h-full bg-no-repeat bg-cover bg-center rounded-lg"
                        ></div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="bg-solabGray-300 p-4 rounded-lg">
                <h2 className="text-xl md:text-2xl font-bold">
                  Project Key Metrics
                </h2>
                {project.keyMetrics?.map((item) => (
                  <div className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                    <span className="text-solabGray-100 text-sm">
                      {item.label}
                    </span>
                    <span className="font-bold text-sm text-right">
                      {item.valueType ===
                      projectConstants.keyMetricTypeNumber ? (
                        item.unitPosition ===
                          projectConstants.keyMetricUnitPositionLeft &&
                        item.unit ? (
                          <NumberFormat
                            thousandsGroupStyle="thousand"
                            value={item.value}
                            displayType="text"
                            thousandSeparator={true}
                            prefix={item.unit}
                          />
                        ) : (
                          <NumberFormat
                            thousandsGroupStyle="thousand"
                            value={item.value}
                            displayType="text"
                            thousandSeparator={true}
                            suffix={item.unit}
                          />
                        )
                      ) : (
                        item.value
                      )}
                    </span>
                  </div>
                ))}
                <div className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                  <span className="text-solabGray-100 text-sm">Status</span>
                  <span className="font-bold py-1 px-2 bg-solabWhite-700 text-solabBlack-500 rounded text-sm">
                    {getProjectPhraseStatusTag2(project)}
                  </span>
                </div>
                <div className="w-full text-center mt-3">
                  {getProjectCountdown(project)}
                  <div className="mt-2">
                    {user ? (
                      whitelistRegistrationInfo &&
                      whitelistRegistrationInfo.isFollowing ? (
                        <div className="w-min py-3 px-4 bg-solab bg-solabGray-900 border border-solabCyan-500 rounded text-solabCyan-500 mx-auto flex items-center justify-center">
                          <AiOutlineCheckCircle className="w-3.5 h-3.5 mr-0.5" />{" "}
                          <span className="ml-0.5">Registered</span>
                        </div>
                      ) : captchaChecked ? (
                        <button
                          type="button"
                          className="py-3 px-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 text-sm mx-auto"
                          onClick={() =>
                            dispatch(
                              projectActions.appRegisterProject({
                                project: project._id,
                                data: {
                                  userId: user._id,
                                },
                              })
                            )
                          }
                        >
                          {isRegisteringProject
                            ? "Registering..."
                            : "Register Now"}
                        </button>
                      ) : (
                        <div className="mx-auto text-center w-min">
                          <ReCAPTCHA
                            sitekey={recaptchaSiteKey}
                            onChange={() => {
                              setCaptchaChecked(true);
                            }}
                          />
                        </div>
                      )
                    ) : (
                      <WalletMultiButton className="mx-auto" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Tab.Group>
                <Tab.List
                  className={
                    "border-b border-solabGray-50 gap-x-6 flex overflow-x-auto"
                  }
                >
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <div className={`w-min whitespace-nowrap cursor-pointer`}>
                        <span
                          className={`${
                            selected ? "font-bold" : "text-solabGray-100"
                          }`}
                        >
                          YOUR TICKETS
                        </span>
                        {selected ? (
                          <hr className="gradient-background-1 mt-1 py-px border-0" />
                        ) : null}
                      </div>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <div className={`w-min whitespace-nowrap cursor-pointer`}>
                        <span
                          className={`${
                            selected ? "font-bold" : "text-solabGray-100"
                          }`}
                        >
                          DESCRIPTION
                        </span>
                        {selected ? (
                          <hr className="gradient-background-1 mt-1 py-px border-0" />
                        ) : null}
                      </div>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <div className={`w-min whitespace-nowrap cursor-pointer`}>
                        <span
                          className={`${
                            selected ? "font-bold" : "text-solabGray-100"
                          }`}
                        >
                          IDO SCHEDULE
                        </span>
                        {selected ? (
                          <hr className="gradient-background-1 mt-1 py-px border-0" />
                        ) : null}
                      </div>
                    )}
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-8">
                  {getYourTicketComponent()}
                  <Tab.Panel>
                    <Tabs
                      className="lg:flex text-solabGray-100 gap-x-8 overflow-x-auto"
                      selectedTabClassName="font-bold text-solabCyan-500 active-dot"
                      selectedTabPanelClassName="py-8 px-10 bg-solabGray-300 rounded-lg text-solabWhite-500"
                    >
                      <TabList className="lg:block flex gap-x-4 overflow-x-auto lg:overflow-x-visible">
                        {project.details?.map((detail) => (
                          <ReactTab
                            className={`w-min whitespace-nowrap cursor-pointer`}
                          >
                            {detail.title}
                          </ReactTab>
                        ))}
                      </TabList>
                      <div className="w-full">
                        {project.details?.map((detail) => (
                          <TabPanel className="mt-8 lg:mt-0 overflow-x-auto">
                            {ReactHtmlParser(detail.content)}
                          </TabPanel>
                        ))}
                      </div>
                    </Tabs>
                  </Tab.Panel>
                  <Tab.Panel className="overflow-x-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="rounded-lg bg-solabGray-300 p-4">
                        <h2 className="text-2xl font-bold">IDO Schedule</h2>
                        <div className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                          <span className="text-solabGray-100 text-sm">
                            Whitelist Registration Start Time
                          </span>
                          <span className="text-sm">
                            {format(
                              new Date(project.phrases.whitelist.startDate),
                              "MMMM do yyyy, hh:mm a OOOO"
                            )}
                          </span>
                        </div>
                        <div className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                          <span className="text-solabGray-100 text-sm">
                            Whitelist Registration End Time
                          </span>
                          <span className="text-sm">
                            {format(
                              new Date(project.phrases.whitelist.endDate),
                              "MMMM do yyyy, hh:mm a OOOO"
                            )}
                          </span>
                        </div>
                        <div className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                          <span className="text-solabGray-100 text-sm">
                            Sale Start Time
                          </span>
                          <span className="text-sm">
                            {format(
                              new Date(project.phrases.sale.startDate),
                              "MMMM do yyyy, hh:mm a OOOO"
                            )}
                          </span>
                        </div>
                        <div className="mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4">
                          <span className="text-solabGray-100 text-sm">
                            Sale End Time
                          </span>
                          <span className="text-sm">
                            {format(
                              new Date(project.phrases.sale.endDate),
                              "MMMM do yyyy, hh:mm a OOOO"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </>
        ) : (
          <div className="text-center mx-auto">
            <Image src={loaderCyan} height={100} width={100} />
          </div>
        )}
      </div>
      <TaskModal />
    </Container>
  );
};

export default ProjectDetail;
