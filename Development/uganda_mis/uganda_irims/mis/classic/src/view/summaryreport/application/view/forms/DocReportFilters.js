Ext.define('Admin.view.summaryreport.application.form.DocReportFilters', {
	extend: 'Ext.form.Panel',
	xtype: 'DocReportFilters',
	layout: 'hbox',
	referenceHolder: true,
	reference: 'docReportFilter',
	defaults:{
		bodyPadding: 1,
        margins: '0 0 0 0',
	},
    items: [{ 
        	xtype: 'fieldset',
            style: 'margin-right:30px',
        	layout: 'hbox',
        	items:[{
			        xtype: 'hiddenfield',
			        name: 'section_id'
			    }, {
			        xtype: 'hiddenfield',
			        name: 'module_id',
			        value: 1
			    }, {
			        xtype: 'hiddenfield',
			        name: 'sub_module_id'
			    },{
			        xtype: 'hiddenfield',
			        name: 'application_code'
			    },{
			        xtype: 'combo',
			        fieldLabel: 'Applicable Documents',
			        labelWidth: 150,
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
			                            table_name: 'par_document_types'

			                        }
			                       }
			                    },
			                    isLoad: true
			                },
			           
			        }
			        
			    }]
			},{ 
		xtype: 'fieldset',
	    style: 'margin:0px',
		layout: 'hbox',
			items:[{
		        xtype: 'textfield',
		        fieldLabel: 'Search',
		        allowBlank: false,
		        width: 300,
		        name: 'from_date',
		    
		},{       
        xtype: 'button',
        text: 'Search Filter',
        name: 'filter_DocReport',
        ui: 'soft-green',
        iconCls: 'fa fa-search',
        handler: 'func_loadUploadedDocs',
       formBind: true,
          }]}
    ],
});