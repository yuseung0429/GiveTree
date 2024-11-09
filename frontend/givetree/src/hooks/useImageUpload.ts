import { useCallback, useEffect, useRef } from 'react';

export interface ImageData {
  key: number;
  file: File;
  url?: string;
  done: boolean;
}

interface ImageUploadEventHandler {
  onSelect?: (fileList: FileList) => void;
  onUpload?: (key: number, url: string) => void;
  onError?: (key: number) => void;
}

const useImageUpload = (
  fileRef: React.RefObject<HTMLInputElement>,
  eventHandler: ImageUploadEventHandler
) => {
  const keyRef = useRef<number>(0);

  const select = useCallback(() => {
    fileRef.current?.click();
  }, [fileRef]);

  const upload = useCallback(
    (handleUpload: (files: ImageData[]) => void) => {
      const files = fileRef.current?.files;
      if (!files) {
        return;
      }

      const imageItems: ImageData[] = new Array(files.length)
        .fill(0)
        .map((_, index) => {
          return { key: ++keyRef.current, file: files[index], done: false };
        });

      handleUpload(imageItems);

      imageItems.forEach((imageItem) =>
        uploadImage(
          imageItem.file,
          (url) => {
            eventHandler.onUpload?.(imageItem.key, url);
          },
          () => {
            eventHandler.onError?.(imageItem.key);
          }
        )
      );
    },
    [fileRef, eventHandler]
  );

  useEffect(() => {
    const file = fileRef.current;
    if (!file) {
      return;
    }

    const handleChange = () => {
      if (!fileRef.current || !fileRef.current.files) {
        return;
      }

      eventHandler.onSelect?.(fileRef.current.files);
    };

    file.addEventListener('change', handleChange);

    return () => {
      file.removeEventListener('change', handleChange);
    };
  }, [fileRef, eventHandler]);

  const uploadImage = (
    file: File,
    onSuccess: (url: string) => void,
    onError: () => void
  ) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/media`, {
      method: 'POST',
      body: formData,
    })
      .then((result) => {
        result
          .text()
          .then((data) => {
            onSuccess(data);
          })
          .catch(() => {
            onError();
          });
      })
      .catch(() => {
        onError();
      });
  };

  return { select, upload };
};

export default useImageUpload;
