import { useCallback, useState } from 'react';

// 드래그 새로고침
const refreshHooks = (refreshAction) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        Promise.resolve(refreshAction?.()).finally(() => {
            setTimeout(() => {
                setRefreshing(false);
            }, 500); // 애니메이션용 여유
        });
    }, [refreshAction]);

    return { refreshing, onRefresh };
};

export default refreshHooks;
