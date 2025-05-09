import { lazy, ComponentType } from 'react';

type ImportComponentType = () => Promise<{ default: ComponentType<unknown> }>;

export const lazyRetry = (componentImport: ImportComponentType) => {
  return new Promise<{ default: ComponentType<unknown> }>((resolve, reject) => {
    // Kiểm tra xem trang đã được refresh chưa
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem('retry-lazy-refreshed') || 'false'
    );

    // Thử import component
    componentImport()
      .then((component) => {
        // Nếu thành công, reset trạng thái refresh
        window.sessionStorage.setItem('retry-lazy-refreshed', 'false');
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // Chưa refresh lần nào, thử refresh trang
          window.sessionStorage.setItem('retry-lazy-refreshed', 'true');
          window.location.reload();
        } else {
          // Đã refresh rồi nhưng vẫn lỗi
          reject(error);
        }
      });
  });
};

export const lazyLoad = (importFunc: ImportComponentType) => {
  return lazy(() => lazyRetry(importFunc));
};
