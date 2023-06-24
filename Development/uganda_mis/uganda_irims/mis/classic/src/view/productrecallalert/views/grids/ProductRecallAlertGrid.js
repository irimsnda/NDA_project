/**
 * created by TMDA team
 * user Dr. Masuke and Eng. Sadam 
 * 
 * created on 18/05/2021
 */
Ext.define('Admin.view.productrecallalert.views.grids.ProductRecallAlertGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productRecallAlertVctr',
    xtype: 'productRecallAlertGrid',
    itemId: 'productRecallAlertGrid',
    store: 'productrecallalertstr',
    listeners: {
        beforerender: function (grid) {
            grid.store.load();
        },
        //itemdblclick: 'onViewDrugProductApplication',
    },


    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var submission_status_id = record.get('submission_status_id');
            if (submission_status_id == 3) {
                return 'invalid-row';
            }
        }
    },


    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],

    export_title: 'Product Recall Alerts List',

    features: [{
            ftype: 'searching',
            minChars: 2,
            mode: 'local'
        }, {
            ftype: 'grouping',
            startCollapsed: true,
            groupHeaderTpl: 'Product Details: {[values.rows[0].data.product_description]},  [{rows.length} {[values.rows.length > 1 ? "Recalls" : "Recall"]}]',
        
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],



    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tra_recall_alert_id',
        hidden: true
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_id',
        hidden: true
    },{
        xtype: 'gridcolumn',
        dataIndex: 'submission_status_id',
        hidden: true
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'batch_number',
        text: 'Batch Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'issue',
        text: 'Route Course',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        text: 'Recall Organization',
        dataIndex: 'recallOrganization',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Recall Date',
        dataIndex: 'recallDate',
        flex: 1,
        tdCls: 'wrap-text',
        renderer: Ext.util.Format.dateRenderer('dS F Y')
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'submission_status_id',
        text: 'Submision Status',
        flex: 1,
        tdCls: 'wrap',        
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:#FFFF78';
                return "Pending";
            }else if(value == 2) {
                metaData.tdStyle = 'color:white;background-color:#759642';
                return "Sent";
            }
            metaData.tdStyle = 'color:white;background-color:#B30000';
            return "Failed";
        }
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                        text: 'Resend',
                        iconCls: 'x-fa fa-undo',
                        tooltip: 'Resend Record',
                        table_name: 'tra_thscp_rims_integration',
                        storeID: 'productrecallalertstr',
                        action_url: 'api/thscp/resubmitProductRecallAlert',
                        action: 'resubmit',
                        //handler: 'doDeleteProductOtherdetails',
                        //hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete'),
                        bind: {
                            hidden: '{isReadOnly}'  // negated
                        }
                    },
                    {
                        text: 'Edit & Resend',
                        iconCls: 'x-fa fa-edit',
                    },
                    {
                        text: 'View Details',
                        iconCls: 'x-fa fa-eye',
                    }
                ]
            }
        }
    }
],




    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'productrecallalertstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('productRecallAlertGrid').fireEvent('refresh', this);

        }
    }]
});