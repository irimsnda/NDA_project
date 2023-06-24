Ext.define('Admin.view.summaryreport.revenue.view.grid.GLCodedRevenueReportGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'gLCodedRevenueReportGrid',
    layout: 'fit',
    width: '100%',
    title:'Gl Coded Revenue Report',
    controller: 'revenueReportViewCtr',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'gLCodedRevenueReportStr',
                remoteFilter: true,
			    grouper: {
			        groupFn: function (item) {
			            return item.get('bank') +' using '+ item.get('currency')+ ' as Currency';
			        }
			    },
                proxy: {
                    url: 'summaryreport/getGLCodedRevenueReport'
                }
            },
            isLoad: false
        },
           
    },

    tbar:[{
            xtype:'gLCodedFilterFrm'
		   }],

    plugins: [{
			    ptype: 'gridexporter'
			 },{
                ptype: 'filterfield'
           }],
	features: [{
                 ftype: 'summary'
			    }],
   
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        name: 'description',
        text: 'GLCode Description',
        flex: 1,
        tbCls: 'wrap',
        summaryRenderer: function(){
                        return '<b>Totals:</b>';
                    }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'GL_Code',
        name: 'GL_Code',
        text: 'Gl Code ',
        flex: 1,
        tbCls: 'wrap',
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'GL_Code_Reference',
        name: 'GL_Code_Reference',
        text: 'Gl Code Reference',
        flex: 1,
        tbCls: 'wrap'
       
	},{
        xtype: 'gridcolumn',
        dataIndex: 'gl_codeamount',
        name: 'gl_codeamount',
        text: 'Total Amount',
        renderer: Ext.util.Format.numberRenderer('0,000.00'),
        flex: 1,
        align: 'right',
        tbCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
           
                        return('Total. '+ Ext.util.Format.number(value, "0,000.00"));
                        },
		},

    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        hidden: true,
        emptyMsg: 'No Records',
        beforeLoad: function() {
        		var grid=this.up('grid'),
        		    zone_id=grid.down('combo[name=zone_id]').getValue(),
        		    section_id=grid.down('combo[name=section_id]').getValue(),
        		    to_date=grid.down('datefield[name=to_date]').getValue(),
                    from_date=grid.down('datefield[name=from_date]').getValue(),
        		    gl_account=grid.down('combo[name=gl_account]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        zone_id:zone_id,
                        gl_account:gl_account,
                        to_date:to_date,
                        from_date:from_date,
                        section_id:section_id

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
			                text: 'Export (Grid Summary)'
			               
			            },{
			            	xtype: 'button',
			            	ui: 'soft-green',
			            	text: 'Print Summary Report',
			            	handler: 'funcPrintGlSummarrReport'
			            },
			            '->',{
			            	xtype: 'button',
			            	ui: 'soft-green',
			            	text: 'Export Detailed Report',
			            	handler: 'funct_ExportGLCodedReport'
			            }
			          ]
			    }
					],

    });
