Ext.define('Admin.view.summaryreport.pms.view.grid.PMSManufacturerReportGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'pmsmanufacturerreportGrid',
    layout: 'fit',
   // width: '100%',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'pmsmanufacturerreportStr',
                remoteFilter: true,
                // grouper: {
                //     groupFn: function (item) {
                //         return item.get('program_name') + item.get('implementation');
                //     }
                // },
                groupField: 'manufacturer_name',
                proxy: {
                    url: 'summaryreport/getPMSManufacturerReport'
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
                 groupHeaderTpl: 'Manufacturer: {[values.rows[0].data.manufacturer_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',

			    }],
   
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'implementation',
        name: 'implementation',
        text: 'Implementation',
        flex: 1,
        tbCls: 'wrap',
        // filter: {
        //         xtype: 'textfield',
        //     }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        name: 'manufacturer_name',
        text: 'Manufacturer',
        flex: 1,
        tbCls: 'wrap'
       
	},{
        xtype: 'gridcolumn',
        dataIndex: 'product_category',
        name: 'product_category',
        text: 'Product Category',
        flex: 1,
        tbCls: 'wrap',
        // filter: {
        //         xtype: 'textfield',
        //     }
		}
        ,{
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        name: 'country_name',
        text: 'Country',
        flex: 1,
        tbCls: 'wrap'
       
		},
        {
        xtype: 'gridcolumn',
        dataIndex: 'date_collected',
        name: 'date_collected',
        text: 'Date of Collection',
        flex: 1,
        tbCls: 'wrap'
       
        },{
            text: 'Options',
            xtype: 'widgetcolumn',
            width: 200,
            widget: {
                width: 170,
                textAlign: 'left',
                xtype: 'button',
                ui: 'soft-green',
                text: 'Export Detailed Report',
                handler: 'exportManufacturerDetailedReport'
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
			            '->',{
			            	xtype: 'exportbtn',
			            	ui: 'soft-green',
			            	text: 'Print(Summary)'
			            }
			          ]
			    }
					],

    });
