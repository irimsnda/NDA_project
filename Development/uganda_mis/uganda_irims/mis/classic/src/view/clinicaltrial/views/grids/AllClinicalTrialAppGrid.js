
Ext.define('Admin.view.clinicaltrial.views.grids.AllClinicalTrialAppGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'clinicaltrialvctr',
    xtype: 'allclinicaltrialappgrid',
    itemId: 'allclinicaltrialappgridId',
    height: Ext.Element.getViewportHeight() - 118,
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        enableTextSelection: true,
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'gridCaller',
        value:'editclinicaltrialreceivingId'
    }],
    plugins: [{
            ptype: 'gridexporter'
        },{
            ptype: 'filterfield'
        }
    ],
    export_title: 'Clinical trial applications',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 100,
                remoteFilter: true,
                storeId: 'allclinicaltrialappgridstr',
                proxy: {
                    url: 'clinicaltrial/getAllClinicalTrialApplications',
                }
            },
            isLoad: true
        },
        itemdblclick: 'loadClinicalTrialEditApp'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking Number',
        width:150,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        width:150,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        width: 150,
        tdCls: 'wrap',
        
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'study_title',
        text: 'Study Title',
        flex:2,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'protocol_no',
        text: 'Protocol No',
        width: 130,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'version_no',
        text: 'Version No',
        width: 130,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
        flex: 1,
        tdCls: 'wrap'
    }]
});
