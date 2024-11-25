import Light from "./components/Light";
import InputEmail from "./components/InputEmail";
import InputEmail2 from "./components/InputEmail2";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import UserList2 from "./components/UserList2";

export default async function Home() {

  return (
    <div className="bg-[#2B2B53]">
      <Light />
      <UserList />
      <UserList2 />
      <p className="my-8">------------------------------------</p>
      {/* <PostList /> */}
      <InputEmail /> <br /> <br />
      <InputEmail2 />
      <div>
        <p>Hello guy</p>
      </div>
      <div>
        <p>Hello guy</p>
      </div>
    </div>
  );
}
