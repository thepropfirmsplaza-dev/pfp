import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Firm } from '../types';
import * as echarts from 'echarts';
import { ChartCard } from './ChartCard';
import { Fingerprint } from 'lucide-react';

interface RadarChartProps {
    activeFirms: Firm[];
}

const BRAND_COLORS = ['#7C3AED', '#22E4AF', '#3B82F6', '#F59E0B', '#EC4899'];

export const FirmDNARadar: React.FC<RadarChartProps> = ({ activeFirms }) => {

    const chartOptions = useMemo(() => {
        try {
            if (!activeFirms || activeFirms.length === 0) return {};

            const seriesData = activeFirms.map((firm, idx) => {
                const color = BRAND_COLORS[idx % BRAND_COLORS.length];
                return {
                    value: [
                        parseInt((firm.profitSplit.match(/\d+/) || ['0'])[0]), // Safely extract first number (e.g. from "85% - 90%")
                        firm.trustScore * 20,       // 0-5  -> 0-100
                        firm.healthScore,           // 0-100
                        85 - (idx * 5),             // Mock: Payout Speed Score 0-100
                        70 + (idx * 8),             // Mock: Support Quality 0-100
                        (firm.rules?.length || 0) > 5 ? 60 : 90 // Mock: Flexibility (fewer rules = higher)
                    ],
                    name: firm.name,
                    itemStyle: { color: color },
                    lineStyle: {
                        width: 2,
                        color: color,
                        shadowBlur: 10,
                        shadowColor: color
                    },
                    areaStyle: {
                        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                            { color: `${color}80`, offset: 0 },
                            { color: `${color}10`, offset: 1 }
                        ])
                    }
                };
            });

            return {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(15, 10, 30, 0.9)',
                    borderColor: 'rgba(246, 174, 19, 0.3)',
                    textStyle: { color: '#fff' },
                    padding: [12, 16],
                    borderRadius: 12,
                    extraCssText: 'box-shadow: 0 10px 30px rgba(0,0,0,0.5); backdrop-filter: blur(10px);'
                },
                radar: {
                    indicator: [
                        { name: 'Profit Split', max: 100 },
                        { name: 'Trust Score', max: 100 },
                        { name: 'Health Score', max: 100 },
                        { name: 'Payout Speed', max: 100 },
                        { name: 'Support', max: 100 },
                        { name: 'Rules Flexibility', max: 100 }
                    ],
                    splitNumber: 4,
                    axisName: {
                        color: '#94a3b8',
                        padding: [3, 5],
                        fontWeight: 'bold'
                    },
                    splitLine: {
                        lineStyle: { color: 'rgba(255,255,255,0.05)' }
                    },
                    splitArea: { show: false },
                    axisLine: {
                        lineStyle: { color: 'rgba(255,255,255,0.1)' }
                    }
                },
                series: [
                    {
                        type: 'radar',
                        data: seriesData,
                        symbol: 'emptyCircle',
                        symbolSize: 6,
                        animationDuration: 1000,
                        animationEasing: 'cubicOut'
                    }
                ]
            };
        } catch (e) {
            console.error("RADAR CRASH:", e);
            return {};
        }
    }, [activeFirms]);

    return (
        <ChartCard
            title="Firm DNA Radar"
            description="Multi-axis attribute comparison profile."
            icon={<Fingerprint className="w-6 h-6" />}
            className="lg:col-span-2"
        >
            <div className="w-full h-[380px]">
                {activeFirms.length > 0 ? (
                    <ReactECharts
                        option={chartOptions}
                        style={{ height: '100%', width: '100%' }}
                        opts={{ renderer: 'canvas' }}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                        <Fingerprint className="w-12 h-12 mb-4 text-white/5" />
                        <span>Select firms to start simulation</span>
                    </div>
                )}
            </div>
        </ChartCard>
    );
};
