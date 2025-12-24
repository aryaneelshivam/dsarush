import React, { useState, useEffect, useMemo } from 'react';
import { Snippet, TestStats } from '../types';
import { soundEngine } from '../services/soundEngine';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, GripVertical, Timer, Trophy } from 'lucide-react';

interface SortableItemProps {
    id: string;
    line: string;
    isCorrect: boolean;
    hasInteracted: boolean;
    isError: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, line, isCorrect, hasInteracted, isError }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 0,
    };

    const showGreen = hasInteracted && isCorrect;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`group flex items-center gap-3 p-3 mb-2 rounded-lg border transition-all duration-300 select-none ${isDragging
                ? 'bg-mt-bg/90 border-mt-main shadow-2xl scale-[1.02] cursor-grabbing'
                : isError
                    ? 'bg-mt-error/30 border-mt-error shadow-[0_0_20px_rgba(202,71,84,0.4)] animate-shake text-mt-error'
                    : showGreen
                        ? 'bg-mt-success/10 border-mt-success/40 text-mt-success shadow-[0_0_15px_rgba(80,250,123,0.1)]'
                        : 'bg-mt-bg border-mt-sub/10 hover:border-mt-sub/30 cursor-grab active:cursor-grabbing'
                }`}
        >
            <div
                className={`transition-colors flex-shrink-0 ${showGreen ? 'text-mt-success' : isError ? 'text-mt-error' : 'text-mt-sub/20 group-hover:text-mt-sub'}`}
            >
                <GripVertical size={18} />
            </div>
            <div className="flex-1 font-mono text-lg whitespace-pre overflow-x-auto no-scrollbar">
                {line || <span className="opacity-0"> </span>}
            </div>
            <AnimatePresence>
                {showGreen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="text-mt-success pr-1"
                    >
                        <CheckCircle2 size={16} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface JumbledAreaProps {
    snippet: Snippet;
    onComplete: (stats: TestStats) => void;
}

export const JumbledArea: React.FC<JumbledAreaProps> = ({ snippet, onComplete }) => {
    const originalLines = useMemo(() => snippet.code.split('\n'), [snippet.code]);
    const [items, setItems] = useState<{ id: string; content: string }[]>([]);
    const [interactedIds, setInteractedIds] = useState<Set<string>>(new Set());
    const [errorId, setErrorId] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    // Initialize and shuffle
    useEffect(() => {
        const linesWithIds = originalLines.map((line, index) => ({
            id: `line-${index}`,
            content: line
        }));

        // Random shuffle
        const shuffled = [...linesWithIds].sort(() => Math.random() - 0.5);
        setItems(shuffled);
        setInteractedIds(new Set());
        setErrorId(null);
        setStartTime(Date.now());
        setIsFinished(false);
    }, [snippet, originalLines]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // 8px move required before drag starts
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const checkCorrectness = (currentItems: { id: string; content: string }[]) => {
        const isOrdered = currentItems.every((item, index) => item.content === originalLines[index]);

        if (isOrdered && !isFinished) {
            setIsFinished(true);
            const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000;

            soundEngine.playClick('combo');

            onComplete({
                wpm: originalLines.join('').length / 5 / (timeElapsed / 60),
                accuracy: 100,
                timeElapsed: Math.round(timeElapsed),
                errors: 0,
                totalChars: originalLines.join('').length,
                maxCombo: items.length
            });
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id && over && active.id !== over.id) {
            setItems((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over!.id);
                const nextItems = arrayMove<{ id: string; content: string }>(prevItems, oldIndex, newIndex);

                // Track interaction for both active and over
                setInteractedIds(prev => {
                    const next = new Set(prev);
                    next.add(active.id as string);
                    next.add(over!.id as string);
                    return next;
                });

                // Check if the moved item is correctly placed
                if (nextItems[newIndex].content === originalLines[newIndex]) {
                    soundEngine.playClick('place_correct');
                } else {
                    setErrorId(active.id as string);
                    soundEngine.playClick('error');
                    setTimeout(() => setErrorId(null), 800);
                }

                checkCorrectness(nextItems);
                return nextItems;
            });
        } else {
            soundEngine.playClick('drop');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6 flex justify-between items-center text-mt-sub text-sm font-mono bg-mt-bg/30 p-4 rounded-xl border border-mt-sub/10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-mt-main" />
                    <span>rearrange lines correctly</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <Timer size={14} />
                        <span>{Math.floor((Date.now() - (startTime || Date.now())) / 1000)}s</span>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-mt-sub/10 border border-mt-sub/20 text-xs">
                        {snippet.language}
                    </div>
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragStart={() => soundEngine.playClick('drag')}
            >
                <SortableContext
                    items={items.map(i => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="relative">
                        {items.map((item, index) => (
                            <SortableItem
                                key={item.id}
                                id={item.id}
                                line={item.content}
                                isCorrect={item.content === originalLines[index]}
                                hasInteracted={interactedIds.has(item.id)}
                                isError={errorId === item.id}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <AnimatePresence>
                {isFinished && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 text-center flex flex-col items-center gap-2"
                    >
                        <motion.div
                            layoutId="success-badge"
                            className="p-4 bg-mt-main/20 rounded-full mb-4 shadow-[0_0_30px_rgba(var(--mt-main-rgb),0.2)]"
                        >
                            <CheckCircle2 size={56} className="text-mt-main" />
                        </motion.div>
                        <h2 className="text-3xl tracking-tight text-mt-text">Perfect Order!</h2>
                        <p className="text-mt-sub font-normal max-w-xs mx-auto">You've successfully reconstructed the snippet pattern.</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.reload()}
                            className="mt-6 px-6 py-2 bg-mt-main text-mt-bg rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
                        >
                            Next Snippet
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};
