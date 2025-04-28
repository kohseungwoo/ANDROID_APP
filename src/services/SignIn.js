// src/services/authService.js
export const loginAPI = async ({ email, password }) => {
    console.log('로그인 시도:', email, password);
    await new Promise((res) => setTimeout(res, 1000)); // 1초 대기 (모의 API)

    if (email === 'test@example.com' && password === '1234') {
        return { success: true };
    }

    return { success: false };
};
