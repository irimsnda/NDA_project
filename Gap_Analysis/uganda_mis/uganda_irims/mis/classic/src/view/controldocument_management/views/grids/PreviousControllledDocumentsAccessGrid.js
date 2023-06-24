
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.controldocument_management.views.grids.PreviousControllledDocumentsAccessGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'controldocumentmanagementvctr',
    xtype: 'previouscontrollleddocumentsaccessgrid',
    itemId: 'previouscontrollleddocumentsaccessgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'previouscontrollleddocumentsaccessstr',
                proxy: {
                    url: 'controldocumentsmng/getPreviousControlDocumentVersions',
                }
            },
            isLoad: true
        }
    },
    tbar: [{
      xtype:'hiddenfield',
      name:'reg_doccontrolreview_id'  
    },'->',{
        xtype: 'displayfield',
        name: 'document_type',
        fieldLabel: 'Document Type',
        labelAlign: 'top',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '13px'
        }
    },{
        xtype: 'displayfield',
        name: 'directorate_name',
        fieldLabel: 'Directorate',
        labelAlign: 'top',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '13px'
        }
    },{
        xtype: 'displayfield',
        name: 'directorate_unit',
        fieldLabel: 'Unit',
        labelAlign: 'top',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '13px'
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        },{
            ptype: 'filterfield'
        }
    ],
    export_title: 'Control Document applications',

    listeners: {
        afterrender:function(grid){
            grid.store.load();
        }
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],bbar: [{
        xtype: 'pagingtoolbar',
        width: '85%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('previouscontrollleddocumentsaccessgrid').fireEvent('refresh', this);

        }
    },
      {
          xtype: 'exportbtn'
      }],
    columns: [{
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
                    text: 'Preview Control Document',
                    iconCls: 'x-fa fa-file',
                    tooltip: ' Control Document',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Control Document',
                    winWidth: '85%',
                    isReadOnly: 1,
                    document_type_id: '',
                    handler: 'previewUploadedDocument'
                }
                ]
            }
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Document Ref Number',
        width: 200,
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'version_no',
        text: 'Document Version No',
        width: 200
    },{
        xtype: 'gridcolumn',
        dataIndex: 'document_type',
        text: 'Document Type',
        width: 200,
        
    },
    {
        xtype: 'gridcolumn',
        text: 'Approved By',
        dataIndex: 'approved_byname',
        width: 200,
        tdCls: 'wrap',
       
    }, {
        xtype: 'gridcolumn',
        text: 'Approved On', renderer:Ext.util.Format.dateRenderer('d/m/Y'),
        dataIndex: 'approval_date',
        width: 200,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Effective From',
        dataIndex: 'effective_date_from',
        width: 200,
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        tdCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        text: 'Next Review Date',
        dataIndex: 'next_review_date',
        width: 200, 
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        tdCls: 'wrap'
    }]
});
