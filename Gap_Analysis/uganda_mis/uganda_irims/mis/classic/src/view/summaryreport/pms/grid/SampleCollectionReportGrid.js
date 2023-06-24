Ext.define('Admin.view.summaryreport.pms.view.grid.SampleCollectionReportGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'samplecollectionreportGrid',
    layout: 'fit',
   // width: '100%',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'samplecollectionreportStr',
                remoteFilter: true,
                grouper: {
                    groupFn: function (item) {
                        return item.get('program_name') + item.get('implementation');
                    }
                },
                proxy: {
                    url: 'summaryreport/getAnnualPMSImplementationReport'
                }
            },
            isLoad: false
        },
           
    },

    plugins: [{
			    ptype: 'gridexporter'
			 },{
                ptype: 'filterfield'
           }],
	features: [{
				 startCollapsed: true,
                 ftype: 'grouping',
                 groupHeaderTpl: 'Program: {[values.rows[0].data.program_name]}, Implementation: {[values.rows[0].data.implementation]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',

			    }],
   
    columns: [
    // {
    //     xtype: 'gridcolumn',
    //     dataIndex: 'program_name',
    //     name: 'program_name',
    //     text: 'Program Name',
    //     width: 150,
    //     tbCls: 'wrap',
    //     filter: {
    //             xtype: 'textfield',
    //         },
    //     // summaryRenderer: function(){
    //     //                 return '<b>Totals:</b>';
    //     //             }
    // },
    {
        xtype: 'gridcolumn',
        dataIndex: 'implementation',
        name: 'implementation',
        text: 'Implementation',
        width: 150,
        tbCls: 'wrap',
        // filter: {
        //         xtype: 'textfield',
        //     }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        name: 'region_name',
        text: 'Region',
        width: 130,
        tbCls: 'wrap'
       
	},{
        xtype: 'gridcolumn',
        dataIndex: 'site_level',
        name: 'site_level',
        text: 'Distribution Levels',
        width: 150,
        tbCls: 'wrap'
       
		},{
        xtype: 'gridcolumn',
        dataIndex: 'site_name',
        name: 'site_name',
        text: 'Sampling Site',
        width: 150,
        tbCls: 'wrap'
		},{
        xtype: 'gridcolumn',
        dataIndex: 'product_category',
        name: 'product_category',
        text: 'Product Category',
        width: 150,
        tbCls: 'wrap',
        // filter: {
        //         xtype: 'textfield',
        //     }
		}
        ,{
        xtype: 'gridcolumn',
        dataIndex: 'product_name',
        name: 'product_name',
        text: 'Product',
        width: 150,
        tbCls: 'wrap'
       
		},
        {
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        name: 'dosage_form',
        text: 'Dosage Form',
        width: 150,
        tbCls: 'wrap'
       
        },{
        xtype: 'gridcolumn',
        dataIndex: 'samples_tobe_collected',
        name: 'samples_tobe_collected',
        text: 'Samples To be Collected',
        width: 150,
        tbCls: 'wrap',
        // summaryType: 'sum',
        // summaryRenderer: function(value){
        //                 return(value);
        //                 },
		},{
        xtype: 'gridcolumn',
        dataIndex: 'collected_samples',
        name: 'collected_samples',
        text: 'Samples Collected',
        width: 150,
        tbCls: 'wrap',
        // summaryType: 'sum',
        // summaryRenderer: function(value){
        //                 return(value);
        //                 },
        },
        {
            text: 'Options',
            xtype: 'widgetcolumn',
            width: 200,
            widget: {
                width: 170,
                textAlign: 'left',
                xtype: 'button',
                ui: 'soft-green',
                text: 'Export Detailed Report',
                handler: 'exportDetailedReport'
            }
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
                    panel = grid.up('panel'),
                    form = panel.down('form'),
                    frm = form.getForm(),
                    filters = JSON.stringify(frm.getValues());

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                       filters: filters
                }
                
        	},
        
        
    }],
    dockedItems: [
			       {
			        xtype: 'toolbar',
			        flex: 1,
			        dock: 'bottom',
			        ui: 'footer',
			        layout: {
			            pack: 'end',
			            type: 'hbox'
			        },
			        items: [
			            {
			                xtype: 'exportbtn',
			                text: 'Print(Summary)'
			               
			            },
			            '->',{
			            	xtype: 'button',
			            	ui: 'soft-green',
			            	text: 'Export Detailed Report',
			            	handler: 'ExportPmsCollectionExport'
			            }
			          ]
			    }
					],

    });
