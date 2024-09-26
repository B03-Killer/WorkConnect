'use client';

import BottomSheetModal from '@/components/BottomSheetModal';
import EditTextField from '@/components/EditTextField';
import TextFieldButton from '@/components/TextFieldButton';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import { useSnackBar } from '@/providers/SnackBarContext';
import useBottomsheetModalBackDropStore from '@/store/bottomsheetModalBackDropStore';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Header from '../_components/Header';
import InputBottomSheet from './_components/InputBottomSheets/InputBottomSheet';
import ProfileImgButton from './_components/ProfileImgButton';

const ProfileEditPage = () => {
  const params = useParams();
  const router = useRouter();
  const [activityState, setActivityState] = useState<string | undefined>('');
  const handleOpen = useBottomsheetModalBackDropStore((state) => state.handleOpen);
  const workspaceUserId = params.targetWorkspaceUserId as string;
  const { openSnackBar } = useSnackBar();
  const { workspaceUser, updateWorkspaceUser } = useWorkspaceUser(workspaceUserId);
  const { control, register, handleSubmit, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: workspaceUser?.name,
      image: null,
      email: workspaceUser?.email,
      phone: workspaceUser?.phone
    }
  });

  const handleStateChange = (value: string | undefined) => {
    setActivityState(value);
    handleOpen();
  };

  const onSubmit = async ({ name, image, email, phone }: FieldValues) => {
    console.log(activityState);
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image[0]);

      reader.onload = () => {
        console.log(reader.result);
      };
    }
  };

  console.log(activityState);
  return (
    <div>
      <Header title="내 프로필 편집" type="edit" />
      <main>
        <div className="flex flex-col w-full items-center px-5 pb-[36px]">
          <ProfileImgButton register={register} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex flex-col gap-2 w-full">
              <Controller
                name="name"
                control={control}
                render={({ field }) => <EditTextField label="이름" {...field} />}
              />
              <div className="lg:border-grey50 lg:border-b-[1px]" />
              <div>
                <BottomSheetModal isUp={true}>
                  <InputBottomSheet value={activityState} handleFn={handleStateChange} />
                </BottomSheetModal>
                <TextFieldButton
                  LabelColor="grey400"
                  label="활동상태"
                  value={activityState}
                  onClick={() => handleStateChange(activityState)}
                />
                <div className="lg:border-grey50 lg:border-b-[1px]" />
              </div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <EditTextField label="이메일" {...field} />}
              />
              <div className="lg:border-grey50 lg:border-b-[1px]" />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <EditTextField label="전화번호" {...field} />}
              />
              <div className="lg:border-grey50 lg:border-b-[1px]" />
              <button>수정 완료하기</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfileEditPage;

// 'use client';

// import api from '@/api';
// import BottomSheetModal from '@/components/BottomSheetModal';
// import Button from '@/components/Button';
// import EditTextField from '@/components/EditTextField';
// import Loading from '@/components/Loading';
// import NotFoundError from '@/components/NotFoundError';
// import TextFieldButton from '@/components/TextFieldButton';
// import useWorkspaceId from '@/hooks/useWorkspaceId';
// import useWorkspaceUser from '@/hooks/useWorkspaceUser';
// import { useSnackBar } from '@/providers/SnackBarContext';
// import useUserStore from '@/store/userStore';
// import { useParams, useRouter } from 'next/navigation';

// import { ChangeEvent, useEffect, useState } from 'react';
// import Header from '../_components/Header';
// import IsOpenInput from './_components/Input/IsOpenInput';
// import InputBottomSheet from './_components/InputBottomSheets/InputBottomSheet';
// import ProfileImgButton from './_components/ProfileImgButton';
// import useInput from './_hooks/useInput';

// const ProfileEditPage = () => {
//   const { editInputs, name, state, email, phone, setName, setState, setEmail, setPhone } = useInput();
//   const { openSnackBar } = useSnackBar();
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const userId = useUserStore((state) => state.userId);
//   const workspaceId = useWorkspaceId();
//   const router = useRouter();
//   const [image, setImage] = useState<File | null>();
//   const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>();
//   const params = useParams();
//   const workspaceUserId = params.targetWorkspaceUserId as string;
//   const { workspaceUser, isPending, isError, updateWorkspaceUser } = useWorkspaceUser(workspaceUserId);
//   const profileImage = workspaceUser && workspaceUser.profile_image;
//   const workspaceName = workspaceUser && workspaceUser.name;
//   const workspaceEmail = workspaceUser && workspaceUser.email;
//   const workspacePhone = workspaceUser && workspaceUser.phone;
//   const workspaceState = workspaceUser && workspaceUser.state;
//   const workspaceIsOpen = workspaceUser && workspaceUser.is_open;

//   const setEmptyStr = (category: string | null | undefined): string => {
//     if (!category) return '';
//     else return category;
//   };

//   useEffect(() => {
//     setImageURL(profileImage);
//     setName(setEmptyStr(workspaceName));
//     setState(setEmptyStr(workspaceState));
//     setEmail(setEmptyStr(workspaceEmail));
//     setPhone(setEmptyStr(workspacePhone));
//     setIsOpen(workspaceIsOpen ? workspaceIsOpen : false);
//   }, [profileImage, workspaceName, workspaceEmail, workspacePhone, workspaceState, workspaceIsOpen]);

//   const handleIsOpenClick = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const file = e.target.files[0];

//     if (!file) {
//       openSnackBar({ message: '파일이 존재하지 않습니다' });
//       return;
//     }
//     if (file.size > 3000000) {
//       openSnackBar({ message: '이미지는 3MB를 넘길 수 없어요' });
//       return;
//     }
//     setImage(file);
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => {
//       setImageURL(reader.result);
//     };
//   };

//   const handleEdit = async () => {
//     if (!(userId && workspaceId)) return;
//     if (!name) {
//       openSnackBar({ message: '이름이 존재하지 않아요' });
//       return;
//     }
//     if (image) {
//       const filename = crypto.randomUUID();
//       await api.storageProfile.postStorageProfile(image, filename);
//       const profile_image = await api.storageProfile.getStorageProfile(filename);
//       const workspaceUser = {
//         id: workspaceUserId,
//         user_id: userId,
//         workspace_id: workspaceId,
//         name,
//         email,
//         phone,
//         state,
//         is_open: isOpen,
//         profile_image
//       };
//       await updateWorkspaceUser(workspaceUser);
//       router.back();
//       return;
//     } else {
//       const workspaceUser = {
//         id: workspaceUserId,
//         user_id: userId,
//         workspace_id: workspaceId,
//         name,
//         email,
//         phone,
//         is_open: isOpen,
//         state
//       };
//       await updateWorkspaceUser(workspaceUser);
//       router.back();
//       return;
//     }
//   };

//   if (isPending) return <Loading />;
//   if (isError) return <NotFoundError />;

//   return (
//     <div>
//       <Header title="내 프로필 편집" type="edit" />
//       <main>
//         <div className="flex flex-col w-full items-center px-5 pb-[36px]">
//           <ProfileImgButton imageURL={imageURL} handleProfileImageChange={handleProfileImageChange} />
//           <div className="flex flex-col w-full gap-[16px] mb-[30px]">
//             {editInputs.map((editInput) => {
//               if (editInput.label === '활동상태')
//                 return (
//                   <div key={editInput.label}>
//                     <BottomSheetModal isUp={true}>
//                       <InputBottomSheet editInput={editInput} />
//                     </BottomSheetModal>
//                     <TextFieldButton
//                       LabelColor="grey400"
//                       label={editInput.label}
//                       value={editInput.value}
//                       onClick={() => editInput.handleFn(editInput.value)}
//                     />
//                     <div className="lg:border-greyorder-b-[1px]" />
//                   </div>
//                 );
//               else
//                 return (
//                   <div key={editInput.label}>
//                     <EditTextField
//                       label={editInput.label}
//                       labelColor="grey400"
//                       value={editInput.value}
//                       onChange={editInput.handleFn}
//                       isRequired={editInput.isRequeired}
//                     />
//                     <div className="lg:border-grey50 lg:border-b-[1px]" />
//                   </div>
//                 );
//             })}
//             <IsOpenInput isOpen={isOpen} handleIsOpenClick={handleIsOpenClick} />
//           </div>
//           <Button theme="primary" isFullWidth onClick={handleEdit}>
//             수정하기
//           </Button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ProfileEditPage;
