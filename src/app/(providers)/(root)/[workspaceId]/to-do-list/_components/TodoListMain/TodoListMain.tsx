'use client';
import useTodoList from '@/hooks/useTodo';
import useDateStore from '@/store/dateStore';
import useUserStore from '@/store/userStore';
import DateButtons from '../DateButtons';
import MonthDate from '../MonthDate';
import PcBackGround from '../PcBackGround';
import ToDoList from '../ToDoList/ToDoList';
import WeekDate from '../WeekDate';

const ToDoListMain = () => {
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
  const { todoList, isPending, isError } = useTodoList(workspaceUserId);
  const isWeekly = useDateStore((state) => state.isWeekly);
  if (!todoList || isError) return;
  if (isPending) return;
  const beforeTodoList = todoList.filter((todo) => todo.status === '진행 전');
  const progressTodoList = todoList.filter((todo) => todo.status === '진행 중');
  const completedTodoList = todoList.filter((todo) => todo.status === '완료');

  return (
    <>
      <main
        className="flex flex-col px-[16px] lg:inline-flex lg:flex-row lg:px-0 lg:h-full lg:w-full
      lg:max-h-[calc(100dvh-84px)] lg:overflow-y-scroll lg:scroll-container
      "
      >
        <div className="lg:flex lg:flex-col lg:flex-shrink-0 lg:w-[297px] lg:bg-[#F4F4F6]">
          <DateButtons />
          {isWeekly ? <WeekDate /> : <MonthDate />}
        </div>
        <div className="flex flex-col lg:inline-grid lg:grid-cols-3 lg:pl-[16px] lg:pr-[17px] lg:pt-[24px] lg:gap-[12px] lg:w-full lg:h-full">
          <ToDoList title="진행 전" todoList={beforeTodoList} />
          <ToDoList title="진행 중" todoList={progressTodoList} />
          <ToDoList title="완료" todoList={completedTodoList} />
        </div>
        <PcBackGround />
      </main>
    </>
  );
};

export default ToDoListMain;
