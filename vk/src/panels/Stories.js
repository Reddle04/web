import {Panel, PanelHeader, PanelHeaderBack, Placeholder} from '@vkontakte/vkui';
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import PersikImage from '../assets/persik.png';
import bridge from "@vkontakte/vk-bridge";

export const Stories = ({id}) => {
    const routeNavigator = useRouteNavigator();

    const onAppear = () => {
        console.log("SRABOLTALL ");
        bridge.send('VKWebAppShowStoryBox', {
            background_type: 'image',
            url: 'https://sun9-65.userapi.com/c850136/v850136098/1b77eb/0YK6suXkY24.jpg',
            attachment: {
                text: 'book', type: 'photo', owner_id: 743784474, id: 12345
            }
        }).then((data) => {
            if (data.result) {
                console.log(data);
            }
        })
            .catch((error) => {
                console.log(error);
            })};

        return (<Panel id={id} onAppear={onAppear}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()}/>}>
                Stories
            </PanelHeader>
            <Placeholder>
                <img width={230} src={PersikImage} alt="Фото дня"/>
            </Placeholder>
        </Panel>);
    };

    Stories.propTypes = {
        id: PropTypes.string.isRequired,
    };
