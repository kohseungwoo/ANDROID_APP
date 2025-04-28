import React from 'react';
import Svg, {G, Rect} from 'react-native-svg';

const CardIcon = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 100" width="50" height="40">
            {/* 카드 전체 그룹을 가운데로 이동 */}
            <G transform="translate(25, 15)">
                {/* 카드 배경 (연한 회색) */}
                <Rect x="0" y="0" width="100" height="70" rx="5" ry="10" fill="#dbd9d9" />

                {/* 상단 박스 (진한 회색) */}
                <Rect x="0" y="0" width="100" height="10" rx="5" ry="2" fill="#808080" />

                {/* 카드칩 네모난 박스 (진한 회색) */}
                <Rect x="10" y="30" width="15" height="10" rx="2" ry="2" fill="#808080" />

                {/* 빨간 박스 (좌측) */}
                <Rect x="75" y="55" width="15" height="20" rx="3" ry="3" fill="#ff1e00" />
                {/* 노란 박스 (우측) */}
                <Rect x="85" y="55" width="20" height="20" rx="3" ry="3" fill="#ffd600" />
            </G>
        </Svg>
    );
};

export default CardIcon;
