import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const [isMoving, setIsMoving] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const cursorRef = useRef(null);
    const trailRefs = useRef([]);
    const trailLength = 10;
    const mousePosition = useRef({ x: -100, y: -100 });
    const movementTimeout = useRef(null);
    const animationFrameId = useRef(null);

    // Initialize trail segments
    useEffect(() => {
        trailRefs.current = trailRefs.current.slice(0, trailLength);
    }, [trailLength]);

    // Handle mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX: x, clientY: y } = e;
            mousePosition.current = { x, y };

            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x,
                    y,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }

            setIsMoving(true);
            if (movementTimeout.current) {
                clearTimeout(movementTimeout.current);
            }

            movementTimeout.current = setTimeout(() => {
                setIsMoving(false);
            }, 500);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Handle mouse down event
    const handleMouseDown = () => {
        setIsMouseDown(true);
        if (cursorRef.current) {
            gsap.to(cursorRef.current, {
                width: 50,
                height: 50,
                borderColor: "var(--accent-primary)", // Changed to match theme
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)",
                duration: 0.2,
                ease: "power2.out"
            });
        }
    };

    // Handle mouse up event
    const handleMouseUp = () => {
        setIsMouseDown(false);
        if (cursorRef.current) {
            gsap.to(cursorRef.current, {
                width: 25,
                height: 25,
                borderColor: "var(--text-primary)", // Changed to match theme
                boxShadow: "none",
                duration: 0.2,
                ease: "power2.out"
            });
        }
    };

    // Update trail segments
    useEffect(() => {
        const updateTrail = () => {
            trailRefs.current.forEach((segment, index) => {
                if (segment) {
                    const delay = (index + 1) * 0.05;

                    gsap.to(segment, {
                        x: mousePosition.current.x,
                        y: mousePosition.current.y,
                        duration: 0.3,
                        delay,
                        opacity: isMoving || isMouseDown ? 1 - index / trailLength : 0,
                        ease: "power2.out",
                        scale: 1 + index / trailLength,
                        boxShadow:
                            isMoving || isMouseDown
                                ? `0 0 10px rgba(255, 255, 255, ${0.2 + index / trailLength})`
                                : "none"
                    });
                }
            });
        };

        const animateTrail = () => {
            updateTrail();
            if (isMoving || isMouseDown) {
                animationFrameId.current = requestAnimationFrame(animateTrail);
            } else if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        };

        animateTrail();
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isMoving, isMouseDown]);

    // Event listeners for mouse down and up
    useEffect(() => {
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <>
            {Array(trailLength).fill().map((_, index) => (
                <div
                    key={index}
                    className="trail-segment"
                    ref={el => trailRefs.current[index] = el}
                ></div>
            ))}
            <div className="custom-cursor" ref={cursorRef}>
                <div className="cursor-dot" />
            </div>
        </>
    );
};

export default CustomCursor;
