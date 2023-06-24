Ext.define('Admin.view.productregistration.views.forms.medicaldevices.AssessmentTemplateFrm',{
	extend:'Ext.form.Panel',
	xtype: 'assessmenttemplatefrm',
	layout:'fit',
	tbar:[
		{ xtype:'button',
		  text:'Save Assessment',
		  ui: 'soft-green',
		  handler:'saveAssessmentTemplate'
		},{
	                xtype: 'tbseparator',
	                width: 20
	    },{
	    	xtype:'button',
	    	text:'Print Report',
	    	ui: 'soft-purple',
	    	handler:'printAssessmentTemplate'
	    }
	],
	items:[
		{xtype:'ckeditor',layout:'fit',name:'template',autoHeight: true},
		{xtype:'hiddenfield',name:'operation'},
		{xtype:'hiddenfield',name:'assessmentId'},
		{xtype:'hiddenfield',name:'application_code'},
		{xtype:'hiddenfield',name:'isSaved'}
	]
});