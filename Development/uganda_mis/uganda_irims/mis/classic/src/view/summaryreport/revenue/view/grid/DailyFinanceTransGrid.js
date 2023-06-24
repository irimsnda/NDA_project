Ext.define('Admin.view.summaryreport.revenue.view.grid.DailyFinanceTransGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'dailyFinanceTransGrid',
    layout: 'fit',
    width: '100%',
    controller: 'revenueReportViewCtr',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'dailyFinanceTransStr',
                remoteFilter: true,
			    grouper: {
			        groupFn: function (item) {
			            return item.get('bank') +' using '+ item.get('currency')+ ' as Currency';
			        }
			    },
                proxy: {
                    url: 'summaryreport/getDailyFinanceTrans'
                }
            },
            isLoad: false
        },
           
    },

    tbar:[{
            xtype:'dailyTransFilterFrm'
		   }],

    plugins: [{
			    ptype: 'gridexporter'
			 },{
                ptype: 'filterfield'
           }],
	features: [{
				 groupHeaderTpl: 'From: {name}',
				 startCollapsed: true,
                 ftype: 'groupingsummary'
			    }],
   
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'trans_ref',
        name: 'trans_ref',
        text: 'Transaction Reference',
        width: 150,
        tbCls: 'wrap',
        filter: {
                xtype: 'textfield',
            },
        summaryRenderer: function(){
                        return '<b>Totals:</b>';
                    }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'payment_ref_no',
        name: 'payment_ref_no',
        text: 'Payment Reference No',
        width: 150,
        tbCls: 'wrap',
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'amt_paid',
        name: 'amt_paid',
        text: 'Amount Paid',
        width: 130,
        tbCls: 'wrap'
       
	},{
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        name: 'currency',
        text: 'Currency',
        width: 150,
        tbCls: 'wrap'
       
		},{
        xtype: 'gridcolumn',
        dataIndex: 'exchange_rate',
        name: 'exchange_rate',
        text: 'Exchange Rate',
        width: 150,
        tbCls: 'wrap'
		},{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        name: 'applicant_name',
        text: 'Account',
        width: 150,
        tbCls: 'wrap',
        filter: {
                xtype: 'textfield',
            }
		},{
        xtype: 'gridcolumn',
        dataIndex: 'PayCtrNum',
        name: 'PayCtrNum',
        text: 'PayCtrNum',
        width: 150,
        tbCls: 'wrap'
       
		},{
        xtype: 'gridcolumn',
        dataIndex: 'receipt_no',
        name: 'receipt_no',
        text: 'Receipt No',
        width: 150,
        tbCls: 'wrap'
       
		},{
        xtype: 'gridcolumn',
        dataIndex: 'bank',
        name: 'bank',
        text: 'Bank Name',
        width: 150,
        tbCls: 'wrap',
        filter: {
                xtype: 'textfield',
            }
		},{
        xtype: 'datecolumn',
        dataIndex: 'date',
        name: 'date',
        format: 'Y-m-d',
        text: 'Payment Date',
        width: 150,
        tbCls: 'wrap'
       
        },{
        xtype: 'gridcolumn',
        dataIndex: 'total',
        name: 'total',
        text: 'Total',
        width: 150,
        tbCls: 'wrap',
        summaryType: 'sum',
        summaryRenderer: function(value){
                        return('Total. '+value);
                        },
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
        		    module_id=grid.down('combo[name=module_id]').getValue(),
        		    section_id=grid.down('combo[name=section_id]').getValue(),
        		    to_date=grid.down('datefield[name=to_date]').getValue(),
        		    from_date=grid.down('datefield[name=from_date]').getValue(),
        		    sub_module_id=grid.down('combo[name=sub_module_id]').getValue();

        		 var store=this.getStore();
        		 store.getProxy().extraParams = {
                        module_id:module_id,
                        to_date:to_date,
                        from_date:from_date,
                        section_id:section_id,
                        sub_module_id:sub_module_id

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
			            	handler: 'DailyFinanceTransExport'
			            }
			          ]
			    }
					],

    });
