/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.dashboard.forms.DashboardTopPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.dashboardtoppanel',
    frame: true,
		controller: 'dashboardvctr',
		
    requires: [
        'Ext.layout.*',
        'Ext.form.*'
    ],
		
	layout:{
		type:'column',
		columns:4
	},
	defaults:{
		margin: 5,
		columnWidth: 0.25
	},
	items:['->',{
		xtype:'panel',
		baseCls: 'weather-panel',
		border: true,
		height: 80, 
		data: {
			icon: '',//
			forecast: 'No of New Applications',
			temperature: 0
		},
		tpl: '<div class="weather-image-container"><i class="x-fa fa-file-text-o fa-5x"></i></div>'+
			 '<div class="weather-details-container">' +
				'<div>{temperature}</div>'+
				'<div>{forecast}</div>'+
			 '</div>'
	},{
		xtype:'panel',
		baseCls: 'weather-panel',
		border: true,
		height: 80, 
		
		data: {
			icon: '',//
			forecast: 'No of Active Tasks',
			temperature: 0
		},
		tpl: '<div class="weather-image-container"><i class="x-fa fa-list fa-5x"></i></div>'+
			 '<div class="weather-details-container">' +
				'<div>{temperature}</div>'+
				'<div>{forecast}</div>'+
			 '</div>'
	}]
    
});