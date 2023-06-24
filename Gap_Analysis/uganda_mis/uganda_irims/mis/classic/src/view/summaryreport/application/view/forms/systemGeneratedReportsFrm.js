Ext.define('Admin.view.summaryreport.application.form.systemGeneratedReportsFrm', {
	extend: 'Ext.form.Panel',
	xtype: 'systemGeneratedReportsFrm',
	layout: 'form',
	items: [{
		xtype: 'fieldset',
		title: 'Search Report',
		layout: 'vbox',
		   items: [{
			   	xtype: 'hiddenfield',
			   	name: 'module_id'
		   },{
			   	xtype: 'textfield',
			   	fieldLabel: 'Reference/Tracking No',
			   	labelWidth: 250,
			   	width: 500,
			   	name: 'Reference',
			   	allowBlank: false
		       }, {
		        xtype: 'combo',
		        fieldLabel: 'Applicable Documents',
		        labelWidth: 250,
		        allowBlank: false,
		        valueField: 'id',
		        displayField: 'name',
		        forceSelection: true,
		        name: 'applicable_documents',
		        queryMode: 'local',
		        width: 500,
		        labelStyle: "font-weight:bold",
		        listeners: {
		            beforerender: {
		                    fn: 'setOrgConfigCombosStore',
		                    config: {
		                        pageSize: 100,
		                        proxy: {
		                        url: 'configurations/getConfigParamFromTable',
		                        extraParams: {
		                            table_name: 'par_document_types',
		                            filters: JSON.stringify({sop_id:9})
		                        }
		                       }
		                    },
		                    isLoad: true
		                },
                         change: function(combo, newVal, oldVal, eopts) {
                         	var form = combo.up('form'),
                         			s_btn = form.down('button[name=search]'),
                         			p_btn = form.down('button[name=print]');
                         	if(newVal == 29){
                         		p_btn.setVisible(false);
                         		s_btn.setVisible(true);
                         	}else{
								p_btn.setVisible(true);
                         		s_btn.setVisible(false);
                         	}
                         },
		        }
	        },{
	        	xtype: 'button',
	        	iconCls: 'fa fa-search',
		        text: 'Search',
		        style: 'margin-left: 300px',
		        handler: 'func_loadSystemGeneratedDocs',
		        ui: 'soft-green',
		        name: 'search',
		        gridXtype: 'systemgeneratedreportsGrid',
		        formBind: true
	        },{
	        	xtype: 'button',
	        	iconCls: 'fa fa-print',
		        text: 'Print',
		        hidden: true,
		        style: 'margin-left: 300px',
		        handler: 'printSysGeneratedDocuments',
		        ui: 'soft-green',
		        name: 'print',
		        formBind: true
	        }],
	      }],
	      listeners:{
	      	afterRender: 'func_setModuleDocReports'
	      }
	    
	      	
	      
	  });