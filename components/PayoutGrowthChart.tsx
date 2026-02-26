import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Firm } from '../types';
import * as echarts from 'echarts';
import { ChartCard } from './ChartCard';
import { TrendingUp } from 'lucide-react';

// Brand colors for the lines (fallback if firm doesn't have an accent)
const BRAND_COLORS = ['#7C3AED', '#22E4AF', '#3B82F6', '#F59E0B', '#EC4899'];

interface PayoutGrowthChartProps {
    activeFirms: Firm[];
    timeRange: '12m' | '6m' | '30d' | '7d';
}

export const PayoutGrowthChart: React.FC<PayoutGrowthChartProps> = ({ activeFirms, timeRange }) => {

    // Simulating realistic time-series data based on firm stats
    const chartOptions = useMemo(() => {
        if (!activeFirms || activeFirms.length === 0) return {};

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let xAxisData: string[] = [];
        let points = 12;

        if (timeRange === '12m') xAxisData = months;
        if (timeRange === '6m') { xAxisData = months.slice(-6); points = 6; }
        if (timeRange === '30d') { xAxisData = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`); points = 30; }
        if (timeRange === '7d') { xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; points = 7; }

        const series = activeFirms.map((firm, idx) => {
            const color = BRAND_COLORS[idx % BRAND_COLORS.length];
            const baseGrowth = parseFloat((firm.profitSplit.match(/\d+/) || ['0'])[0]) * 50; // Arbitrary scaler for simulation

            // Generate a flowing, compounding curve
            let currentVal = 0;
            const data = Array.from({ length: points }, (_, i) => {
                // Add some organic noise so curves don't look completely linear
                const noise = (Math.random() - 0.2) * (baseGrowth * 0.2);
                currentVal += baseGrowth + noise + (i * 50); // Compound effect
                return Math.max(0, Math.round(currentVal));
            });

            return {
                name: firm.name,
                type: 'line',
                data: data,
                smooth: 0.4, // Cubic monotone interpolation
                symbol: 'circle', // Only show dots on hover
                showSymbol: false,
                symbolSize: 8,
                itemStyle: {
                    color: color,
                    borderWidth: 2,
                    borderColor: '#fff'
                },
                lineStyle: {
                    width: 3,
                    color: color,
                    shadowColor: color, // The Signature Glow
                    shadowBlur: 15,
                    shadowOffsetY: 5
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: `${color}40` }, // 25% opacity
                        { offset: 1, color: `${color}00` }  // 0% opacity
                    ])
                },
                emphasis: {
                    focus: 'series',
                    lineStyle: {
                        width: 4,
                        shadowBlur: 25 // Glow expands on hover
                    }
                }
            };
        });

        return {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(15, 10, 30, 0.9)',
                borderColor: 'rgba(246, 174, 19, 0.3)',
                textStyle: { color: '#fff' },
                padding: [12, 16],
                borderRadius: 12,
                extraCssText: 'box-shadow: 0 10px 30px rgba(0,0,0,0.5); backdrop-filter: blur(10px);',
                axisPointer: {
                    type: 'line',
                    lineStyle: { color: 'rgba(255,255,255,0.1)', width: 1, type: 'dashed' }
                }
            },
            grid: {
                top: 40,
                right: 20,
                bottom: 20,
                left: 60,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisData,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: '#94a3b8', margin: 16 }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: { color: 'rgba(255,255,255,0.03)' }
                },
                axisLabel: {
                    formatter: '${value}',
                    color: '#94a3b8'
                }
            },
            series: series,
            animationDuration: 1200, // PRD entrance requirement
            animationEasing: 'cubicInOut'
        };
    }, [activeFirms, timeRange]);

    return (
        <ChartCard
            title="Payout Growth Stream"
            description="Cumulative simulated payouts over time based on profit split and pass rates."
            icon={<TrendingUp className="w-6 h-6" />}
            cornerAction={
                <div className="flex items-center space-x-2 bg-black/40 px-4 py-2 rounded-xl border border-secondary/20 shadow-[0_0_15px_rgba(34,228,175,0.1)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_currentColor]"></div>
                    <span className="text-xs font-bold text-secondary tracking-widest whitespace-nowrap uppercase">LIVE ENGINE</span>
                </div>
            }
        >
            <div className="w-full h-[400px]">
                {activeFirms.length > 0 ? (
                    <ReactECharts
                        option={chartOptions}
                        style={{ height: '100%', width: '100%' }}
                        opts={{ renderer: 'canvas' }}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                        <TrendingUp className="w-12 h-12 mb-4 text-white/5" />
                        <span>Select firms to start simulation</span>
                    </div>
                )}
            </div>
        </ChartCard>
    );
};
