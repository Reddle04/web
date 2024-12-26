import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import React from 'react';
import PropTypes from 'prop-types';
import bridge from "@vkontakte/vk-bridge";
import axios from "axios";

export const Home = ({ id, fetchedUser }) => {
    const { photo_200, city, first_name, last_name } = { ...fetchedUser };
    const [imageUrl, setImageUrl] = React.useState(null);

    const KEY = 'SSmSX35Cm0-8I6KP5eNSFU9kD9zQRLy9ovXLngWQYZA';

    const getRandomImageFromUnsplash = async () => {
        try {
            const response = await axios.get('https://api.unsplash.com/photos/random', {
                headers: {
                    Authorization: `Client-ID ${KEY}`
                },
                params: {
                    query: 'nature',
                    orientation: 'landscape'
                }
            });
            const { urls } = response.data;
            setImageUrl(urls.regular);
        } catch (error) {
            console.error('Ошибка при получении картинки:', error);
            setImageUrl('https://via.placeholder.com/200');
        }
    };

    const handleShowStoryBox = async () => {
        await getRandomImageFromUnsplash();

        if (imageUrl) {
            bridge.send('VKWebAppShowStoryBox', {
                background_type: 'image',
                url: imageUrl,
                attachment: {
                    text: 'book',
                    type: 'photo',
                    owner_id: 743784474,
                    id: 12345,
                    media_id: imageUrl,
                }
            }).then((data) => {
                if (data.result) {
                    console.log('История опубликована', data);
                }
            }).catch((error) => {
                console.error('Ошибка при публикации:', error);
            });
        }
    };

    return (
        <Panel id={id}>
            <PanelHeader>Главная</PanelHeader>
            {fetchedUser && (
                <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
                    <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
                        {`${first_name} ${last_name}`}
                    </Cell>
                </Group>
            )}

            <Group header={<Header mode="secondary">Navigation Example</Header>}>
                <Div>
                    <Button stretched size="l" mode="secondary" onClick={handleShowStoryBox}>
                        Тык, чтобы узнать фотку дня!
                    </Button>
                </Div>
            </Group>
        </Panel>
    );
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};
