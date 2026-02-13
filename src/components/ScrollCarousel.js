"use client";

import React, {
    useEffect,
    useRef,
    useState,
    useLayoutEffect,
    forwardRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

// --- Custom Hook for Animations ---
const useFeatureAnimations = (
    containerRef,
    scrollContainerRef,
    scrollContainerRef2,
    progressBarRef,
    cardRefs,
    cardRefs2,
    isDesktop,
    maxScrollHeight
) => {
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Desktop horizontal scroll logic
            if (isDesktop) {
                const scrollWidth1 = scrollContainerRef.current?.scrollWidth || 0;
                const scrollWidth2 = scrollContainerRef2.current?.scrollWidth || 0;
                const containerWidth = containerRef.current?.offsetWidth || 0;
                const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
                const viewportOffset = (containerWidth - cardWidth) / 2;

                const finalOffset1 = scrollWidth1 - containerWidth + viewportOffset;
                const finalOffset2 = scrollWidth2 - containerWidth + viewportOffset;

                // Use the provided maxScrollHeight or the calculated offset as the scroll distance
                const scrollDistance = maxScrollHeight || finalOffset1;

                gsap.set(scrollContainerRef2.current, {
                    x: -finalOffset2 + viewportOffset * 2,
                });

                gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top top",
                            end: () => `+=${scrollDistance}`,
                            scrub: 1,
                            pin: true,
                        },
                    })
                    .fromTo(
                        scrollContainerRef.current,
                        { x: viewportOffset },
                        { x: -finalOffset1 + viewportOffset, ease: "none" }
                    );

                gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top top",
                            end: () => `+=${scrollDistance}`,
                            scrub: 1,
                        },
                    })
                    .to(scrollContainerRef2.current, { x: viewportOffset, ease: "none" });

                gsap.to(progressBarRef.current, {
                    width: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${scrollDistance}`,
                        scrub: true,
                    },
                });
            } else {
                // Mobile vertical scroll logic
                const allCards = [...cardRefs.current, ...cardRefs2.current];
                allCards.forEach((card, index) => {
                    if (card) {
                        gsap.fromTo(
                            card,
                            {
                                opacity: 0,
                                x: index % 2 === 0 ? -200 : 200,
                            },
                            {
                                opacity: 1,
                                x: 0,
                                duration: 1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 80%", // Adjusted trigger point for better mobile experience
                                    toggleActions: "play none none none",
                                    once: true,
                                },
                            }
                        );
                    }
                });
            }
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [isDesktop, maxScrollHeight]);
};

// --- Component Definition ---
export const ScrollCarousel = forwardRef(
    ({ features, className, maxScrollHeight }, ref) => {
        const containerRef = useRef(null);
        const scrollContainerRef = useRef(null);
        const scrollContainerRef2 = useRef(null);
        const progressBarRef = useRef(null);
        const cardRefs = useRef([]);
        const cardRefs2 = useRef([]);
        const [isDesktop, setIsDesktop] = useState(false);

        // Dynamic sorting for the second row of cards
        // Using useMemo to prevent re-sorting on every render if features don't change
        const features2 = React.useMemo(() => [...features].sort(() => Math.random() - 0.5), [features]);

        useEffect(() => {
            const checkDesktop = () => {
                setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
            };
            checkDesktop();
            window.addEventListener("resize", checkDesktop);
            return () => window.removeEventListener("resize", checkDesktop);
        }, []);

        useFeatureAnimations(
            containerRef,
            scrollContainerRef,
            scrollContainerRef2,
            progressBarRef,
            cardRefs,
            cardRefs2,
            isDesktop,
            maxScrollHeight
        );

        const renderFeatureCards = (featureSet, refs) =>
            featureSet.map((feature, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        if (el) refs.current[index] = el;
                    }}
                    className="feature-card flex-shrink-0 w-full md:w-[600px] h-full
          z-10 gap-4 group relative transition-all duration-300 ease-in-out" // Fixed width for desktop cards
                >
                    <div
                        className={cn(
                            `relative h-[400px] md:h-full p-4 lg:p-8 rounded-3xl backdrop-blur-sm 
              flex items-center justify-center z-10 
              transition-all duration-300 my-4`,
                            `backdrop-blur-lg border border-white/20 text-black dark:text-white overflow-hidden`,
                            "group-hover:scale-105 centered:scale-105"
                        )}
                    >
                        <img
                            src={
                                feature.image ||
                                "https://images.pexels.com/photos/9934462/pexels-photo-9934462.jpeg"
                            }
                            alt={feature.title}
                            className="absolute inset-0 w-full h-full 
              object-cover z-[-1] rounded-3xl transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />

                        {/* <RippleLoader className="!absolute z-[-1]" icon={feature.icon} /> */}
                        <div className="absolute bottom-0 z-10 w-full px-4 pb-8">
                            <div
                                className={cn(
                                    `flex flex-col justify-end h-full opacity-100 translate-y-0 transition-all duration-300 ease-out text-center`
                                )}
                            >
                                <div className="flex justify-center mb-4">
                                    {feature.icon && <feature.icon className="w-12 h-12 text-white" />}
                                </div>
                                <h3 className="text-3xl mb-2 font-bold text-white transition-all duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-200 text-sm mb-4 opacity-90 font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                        {/* Hover Effect */}
                        <div className="pointer-events-none absolute inset-0 transition-all duration-300 bg-white/0 group-hover:bg-white/5 rounded-3xl" />
                    </div>
                </div>
            ));

        return (
            <section
                className={cn(
                    "bg-transparent text-foreground relative overflow-hidden",
                    className
                )}
                ref={ref}
            >
                <div
                    ref={containerRef}
                    className="relative overflow-hidden h-auto md:h-screen py-10 md:py-20 
          flex flex-col gap-0 z-10 
          lg:[mask-image:_linear-gradient(to_right,transparent_0,_black_5%,_black_95%,transparent_100%)]"
                >
                    <div
                        ref={scrollContainerRef}
                        className="flex flex-col md:flex-row gap-8 
            items-center h-auto md:h-full px-6 md:px-0"
                    >
                        {renderFeatureCards(features, cardRefs)}
                    </div>

                    <div
                        ref={scrollContainerRef2}
                        className="flex flex-col md:flex-row gap-8 items-center h-full px-6 md:px-0 hidden xl:flex absolute top-0 left-0 w-full h-full pointer-events-none" // Positioned absolutely for parallel effect
                        style={{ paddingTop: '20px', paddingBottom: '20px' }} // Adjustment
                    >
                        {/* {renderFeatureCards(features2, cardRefs2)} */}
                        {/* The second row logic in the provided code seemed to imply a dual-scroll or parallax layer. 
                However, for simplicity and stability in this conversion, I'll stick to the primary scroll row 
                unless I'm sure about the layout. The original code renders the SAME cards but sorted randomly?
                And the animation moves scrollContainerRef2 in opposite direction? 
                Let's keep it if `xl:flex` (extra large screens) is desired.
            */}
                        {renderFeatureCards(features2, cardRefs2)}
                    </div>

                    {isDesktop && (
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-2 bg-black/30 dark:bg-white/30 z-50 overflow-hidden rounded-full">
                            <div
                                ref={progressBarRef}
                                className="h-full rounded-full relative overflow-hidden transition-all duration-100 bg-white"
                                style={{ width: "0%" }}
                            >
                                {/* <div className="absolute inset-0 animated-water" /> // CSS Animation for water effect */}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    }
);

ScrollCarousel.displayName = "ScrollCarousel";

export default ScrollCarousel;
