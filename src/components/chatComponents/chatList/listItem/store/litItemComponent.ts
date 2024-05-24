import { ListItem } from '..';
import { IStoreData, connect } from '../../../../../core/Store';

class ListItemComponent extends ListItem{}

export default connect((state: IStoreData) => ({
	// value: state.currentUser?.display_name
	chatList: state.chatList,

}))(ListItemComponent);
