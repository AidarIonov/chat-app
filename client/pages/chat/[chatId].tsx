import {GetServerSideProps, NextPage} from "next";
import {withLayout} from "@/components/layout/WithLayout";
import Chat from "@/components/chat/Chat";
import {chatService} from "@/services/chat.service";

const ChatPage: NextPage = (props) => {
    return (
        <>
        <Chat/>
        </>
    );
}


export default withLayout(ChatPage);