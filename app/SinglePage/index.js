var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TextInput,
	TouchableHighlight,
	SwitchIOS,
} = React;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var ListItem = require('../components/ListItem.js');
var EachDetail = require('../components/EachDetail.js');
var Button = require('../components/Button.js');
var CommentItem = require('../components/CommentItem.js');
var globalStyles = require('../globalStyles.js');

var rowData = {
	authorName: 'Jonathan',
	question: "What are three verbs that describes your life? Why?",
	tags: ["Ice Breaker", "Love", "Adventurous"],
};
var comments = [ 
	{
		name: "Jonathan",
		comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
	},
	{
		name: "Jonathan",
		comment: "Maker, Thinker, and Believer. I think that I am a maker because I pursue..."
	}
];

var WritePrompt = React.createClass({
	render: function (){
		return (
			<View >
				<View style={[styles.hintText]}>

					<Text style={[globalStyles.text.center, styles.oneLine]}>
						Interested in how people respond?
					</Text>

					<Text style={[globalStyles.text.center, styles.oneLine]}>
					To read people's heart, you must first share yours. 
					</Text>

				</View>

					<TouchableHighlight onPress={this.props.callback} underlayColor='#fff'>
						<View>
							<Button text="Share My Heart" invert={true} />
						</View>
					</TouchableHighlight>

				</View>
		);
	}
});

var WriteBox = React.createClass({
	getInitialState: function (){
		return {
			privateResponse: false,
		};
	},
	render: function (){
		return (
			<View style={globalStyles.centerContent}>
				<TextInput
					style={styles.inputText}
					onChangeText={(text) => this.setState({text})}
					value={this.state.text}
					placeholder="Share your response to see other's"
					placeholderTextColor='#aaa'
					multiline={true}
				/>

				<View style={styles.privacyToggle}>
				<Text style={[globalStyles.text.color.white, ]} >
					Privacy
				</Text>
				<SwitchIOS
				  onValueChange={(value) => this.setState({privateResponse: value})}
				  style={{marginBottom: 10}}
				  value={this.state.privateResponse} />
				  </View>
			
				<TouchableHighlight onPress={this.props.callback} underlayColor='#fff'>
					<View>
						<Button text="Share My Heart" invert={true} />
					</View>
				</TouchableHighlight>

				<Text style={[globalStyles.text.center, globalStyles.text.color.white, globalStyles.text.size.small, styles.writeHint]}>
					We want an honest environment. 3 strikes policy: three question flagged and you are permanently banned. 
				</Text>
					
				<Text style={[globalStyles.text.center, globalStyles.text.color.white, globalStyles.text.size.small, styles.writeHint]}>
					For sensitive matters you can turn on privacy, which will hide your username, and hide the answer from your profile. Flagged private answer will still count toward ban
				</Text>

			</View>
		)
	}
});

var SinglePage = React.createClass({
	getInitialState: function (){
		console.log(this.props.data)
		return {
			visible: false,
			writingComment: false,
			comments: comments
		};
	},
	_onStartResponse: function (){
		this.setState({
			writingComment: true,	
		});	
	},
	_onSubmitResponse: function (){
		this.setState({
			visible: true,	
		});	
	},
	render: function() {
		var response = undefined;
		if(this.state.visible)
			response = (
				<Text style={[globalStyles.text.center, styles.thanksText]}>
					Thanks for sharing!
				</Text>
			);
			else {
				if(this.state.writingComment == false)
					response = <WritePrompt callback={this._onStartResponse}/>
				else 
					response = <WriteBox callback={this._onSubmitResponse}/>
			}

			return (
				<ScrollView
					automaticallyAdjustContentInsets={false}
					contentInset={{bottom: 50}}
					style={styles.container}
					>

					<ListItem showTopComment={false} data={this.props.data} />

					<EachDetail column={true} padding={20} invert={true}>
						{response}
					</EachDetail>

					{this.state.comments.map((comment) =>
											 <CommentItem visibleUser={this.state.visible} visibleComment={this.state.visible} data={comment} />
											 )}
										 </ScrollView>
			);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1, 
		marginBottom: -1, 
		backgroundColor: '#fff',
	},
	oneLine: {
		color: '#fff',
	},
	hintText: {
		margin: 20,
		marginTop: 0,
	},
	thanksText: {
		margin: 10,
		color: '#fff',
	},
	privacyToggle: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	inputText: {
		width: width - 30,
		height: height*.3, 
		padding: 10,
		fontSize: 15,
		backgroundColor: '#fff',
		marginBottom: 20,
	},
	writeHint: {
		marginTop: 10,	
	}
});

module.exports = SinglePage;
