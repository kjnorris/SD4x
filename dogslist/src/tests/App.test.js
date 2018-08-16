import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import App from '../App';

configure({ adapter: new Adapter() });

describe("Test suite for App component", function() {
	it("only one element in App class", function() {
		const wrapper = shallow(<App />);
		expect(wrapper.find(".App")).length(1);
	});
	
	it('Dog List contains two dogs', function() {
		const wrapper = mount(<App />);
		expect(wrapper.find('Dogs').find('DogItem')).length(2);
	});
	
	it("successfully adds dog to list when form submitted", function() {
		const wrapper = mount(<App />);
		const adddog = wrapper.find('AddDog');
		
		adddog.find('#dogName').instance().value = 'Lola';
		adddog.find('#imageURL').instance().value = 'https://static.pexels.com/photos/54386/pexels-photo-54386.jpeg';
		adddog.find('#dogBreed').instance().value = 'Beagle';
		
		const form = adddog.find('form');
		form.simulate('submit');
		expect(wrapper.find('Dogs').find('DogItem')).length(3);
		expect(wrapper.state().dogs[2].name == 'Lola');
	});
	
	it("removes dog from list when deleted", function() {
		const wrapper = mount(<App />);
		const deleteLink = wrapper.find('a').first();
		
		deleteLink.simulate('click');
		expect(wrapper.find('Dogs').find('DogItem')).length(1);
	});
});

