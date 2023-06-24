

/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductCertificateReleaseGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productcertificatereleasegrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'productcertificatereleaseStr',
                proxy: {
                    url: 'productregistration/getProductApprovalApplications'//getClinicalTrialManagerMeetingApplications
                }
            },
            isLoad: false
        }
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [{
        xtype: 'widgetcolumn',
        text: 'Print',
        widht: 150,
        widget: {
            xtype: 'button',
            iconCls: 'x-fa fa-certificate',
            ui: 'soft-green',
            text: 'Registration Certificate/Letter',
            name: 'certificate',
            tooltip: 'Print Registration Certificate',
            backend_function: 'generateProductRegCertificate',
            handler: 'newGenerateProductRegCertificate'
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
                items: [
                    {
                        text: 'Registration Certificate/Letter',
                        iconCls: 'x-fa fa-certificate',
                        handler: '',
                        name: 'certificate',
                        backend_function: 'generateProductRegCertificate',
                        handler: 'generateProductRegCertificate'
                    },
                   
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'editpreviewProductInformation'
                    }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var status_id = rec.get('application_status_id');
            if (status_id === 6 || status_id == 6) {//Approved
                widget.down('menu menuitem[name=certificate]').setVisible(true);
            } else {//Rejected
                widget.down('menu menuitem[name=certificate]').setVisible(false);
            }
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand_Name',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'evaluator_recommendation',
        text: 'Evaluator Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'auditor_recommendation',
        text: 'Audit Recommendation',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tc_recomm',
        text: 'TC Recommendation',
        width: 150
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dg_recommendation',
        text: 'Approval Recommendation',
        width: 150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        text: 'Certificate No',
        width: 150
    }]
});