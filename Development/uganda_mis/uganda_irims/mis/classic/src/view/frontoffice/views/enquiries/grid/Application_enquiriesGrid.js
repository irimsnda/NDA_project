Ext.define('Admin.view.frontoffice.enquiries.grid.Application_enquiriesGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'application_enquiriesGrid',
    layout: 'fit',
    controller: 'enquiriesCtr',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'enquiriesStr',
                proxy: {
                    url: 'openoffice/getEnquiries'
                }
            },
            isLoad: false
        },
       // itemdblclick: 'assignResponsibleUserToEnquiryApplication'
    },
    tbar:[{
          xtype: 'toolbar',
          ui: 'footer',
          width: '100%',
          layout: 'hbox',
          items: [{
            xtype: 'displayfield',
            labelAlign: 'left',
            labelWidth: 400,
            fieldLabel: 'Double click to assign to user ',
            //value: '****',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px',
                'margin-top': '-2px'
            }
        },'->',{
          	xtype: 'textfield',
          	fieldLabel: 'Reference/Tracking No:',
          	labelWidth: 120,
          	name: 'Reference'
          },{
	        xtype: 'button',
	        iconCls: 'fa fa-search',
	        text: 'Search',
	        handler: 'func_enquirySearch',
	        ui: 'soft-green'
        }],
    }],

    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'isRead',
        name: 'isRead',
        text: 'IS-READ',
        width: 120,
        tbCls: 'wrap',
        renderer: function (value, metaData) {
            if(value==0) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'isDone',
        name: 'isDone',
        text: 'IS Active',
        width: 120,
        tbCls: 'wrap',
        renderer: function (value, metaData) {
            if(value==0) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        name: 'reference_no',
        text: 'Reference No',
        width: 120,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        name: 'tracking_no',
        text: 'Tracking Type',
        width: 120,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'from_user',
        name: 'from_user',
        text: 'Previous User',
        width: 120,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'to_user',
        name: 'to_user',
        text: 'Current User',
        width: 120,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'submitted_by',
        name: 'submitted_by',
        text: 'Submitted By',
        width: 120,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant',
        name: 'applicant',
        text: 'Applicant',
        width: 120,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        name: 'date_received',
        text: 'Date Received',
        width: 120,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'date_released',
        name: 'date_released',
        text: 'Date Released',
        width: 120,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'total_days',
        name: 'total_days',
        text: 'Days Taken',
        width: 120,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'previous_process',
        name: 'previous_process',
        text: 'Previous Process',
        width: 120,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'current_process',
        name: 'current_process',
        text: 'Current Process',
        width: 120,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'submission_status',
        name: 'submission_status',
        text: 'Submission Status',
        width: 120,
        tbCls: 'wrap'
    }],

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                reference = grid.down('textfield[name=Reference]').getValue(),
                store = grid.getStore();
            store.getProxy().extraParams = {
                'reference':reference
            }
        },  
    }]

    });
