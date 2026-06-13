"use client";

import React from "react";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen w-full bg-[#0f172a] text-slate-200 antialiased overflow-x-hidden">
            {/* Left Column: Login Section */}
            <section className="flex w-full flex-col justify-between p-8 md:p-12 lg:w-1/2 lg:p-16 bg-[#0f172a]">
                {/* Brand Header */}
                <header className="flex items-center gap-2 mb-8 lg:mb-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-md shadow-indigo-600/30">
                        <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            ></path>
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">PostOps</span>
                </header>

                {/* Clerk Sign-in Form Container */}
                <div className="mx-auto my-auto flex w-full max-w-md flex-col justify-center gap-6 py-8" style={{ color: "#f1f5f9" }}>
                    <div className="flex flex-col gap-2 text-left mb-2">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">
                            Welcome back
                        </h1>
                        <p className="text-sm text-slate-400">
                            Please sign in using the form below to access your dashboard.
                        </p>
                    </div>

                    <div className="w-full flex text-slate-200" style={{ color: "#f1f5f9" }}>
                        <SignIn
                            routing="hash"
                            signUpUrl="/signup"
                            appearance={{
                                baseTheme: dark,
                                variables: {
                                    colorPrimary: "#6366f1",
                                    colorBackground: "#1e293b",
                                    colorInputBackground: "#0f172a",
                                    colorText: "#f1f5f9",
                                    colorTextSecondary: "#94a3b8",
                                    colorInputText: "#f1f5f9",
                                    colorBorder: "#334155",
                                    borderRadius: "8px",
                                },
                                elements: {
                                    rootBox: "!w-full",
                                    cardBox: "!w-full !shadow-lg !border !border-slate-800 !rounded-xl",
                                    card: "!bg-[#1e293b] !w-full",
                                    headerTitle: "!text-2xl !font-bold !text-white",
                                    headerSubtitle: "!text-slate-400 !text-sm",
                                    socialButtonsBlockButton:
                                        "!bg-[#0f172a] !border !border-slate-700 hover:!bg-slate-800 !text-white !font-medium !py-2.5 !px-4 !rounded-lg !transition-all !duration-200 !w-full !mb-3",
                                    socialButtonsBlockButtonText:
                                        "!text-slate-200 !font-medium",
                                    socialButtonsProviderIcon:
                                        "!text-slate-200",
                                    formButtonPrimary:
                                        "!bg-indigo-600 hover:!bg-indigo-500 !text-white !font-semibold !py-3 !px-4 !rounded-lg !shadow-lg !shadow-indigo-600/20 !transition-all !duration-200 !transform hover:!-translate-y-0.5 active:!translate-y-0 !w-full",
                                    formFieldLabel: "!text-slate-300 !font-medium !mb-1.5 !text-xs",
                                    formFieldInput:
                                        "!bg-[#0f172a] !border !border-slate-700 !text-white !rounded-lg !py-3 !px-4 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !transition-all !w-full",
                                    footerActionLink: "!text-indigo-400 hover:!text-indigo-300 !font-semibold !transition-colors",
                                    footerActionText: "!text-slate-400 !text-sm",
                                    footer: "!bg-transparent !text-slate-400 !text-sm !p-0",
                                    dividerText: "!text-slate-400 !text-sm !my-4",
                                    dividerLine: "!bg-slate-700",
                                    identityPreviewText: "!text-slate-200",
                                    identityPreviewEditButtonIcon: "!text-slate-400 hover:!text-white",
                                },
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Right Column: Hero Image Section */}
            <section className="relative hidden w-1/2 overflow-hidden bg-slate-950 lg:block">
                {/* Background Image - Happy young woman workspace */}
                <Image
                    src="/login_workspace.png"
                    alt="Happy Professional Workspace"
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover opacity-75 object-center"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/40 to-transparent"></div>

                {/* Floating Content Overlay */}
                <div className="absolute bottom-0 left-0 p-16 w-full z-10">
                    <div className="bg-slate-950/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 max-w-xl shadow-2xl">
                        <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
                            Scale your social presence with AI efficiency.
                        </h2>
                        <p className="text-base text-slate-300 mb-6 leading-relaxed">
                            Join 10,000+ creators and brands using PostOps to automate
                            scheduling, generate viral content, and analyze performance in
                            real-time.
                        </p>
                        <div className="flex items-center gap-4">
                            {/* Custom High Quality Avatars */}
                            <div className="flex -space-x-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800">
                                    <img
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                                        alt="User"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                                        alt="User"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800">
                                    <img
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                                        alt="User"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-slate-300">
                                Trusted by top-tier marketing teams
                            </span>
                        </div>
                    </div>
                </div>

                {/* Ambient Decorative Blurs */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-40 left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]"></div>
            </section>
        </main>
    );
}
