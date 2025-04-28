import React from 'react';
import Svg, {Path} from 'react-native-svg';

const SmsEnvelopeIcon = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100" width="50" height="40">
            {/* 봉투 배경 */}
            <Path
                d="M20 30 h110 a5 5 0 0 1 5 5 v50 a5 5 0 0 1 -5 5 h-110 a5 5 0 0 1 -5 -5 v-50 a5 5 0 0 1 5 -5 z"
                fill="#ffcd38"
            />

            {/* 봉투 윗부분 (상단 덮개) */}
            <Path
                d="M20 30 h110 l-55 30 -55 -30 z"
                fill="#ffac33"
            />

            {/* 봉투 경계선 */}
            <Path
                d="M20 30 l55 30 l55 -30"
                stroke="#b08500"
                strokeWidth="2"
                fill="none"
            />
        </Svg>
    );
};

export default SmsEnvelopeIcon;
