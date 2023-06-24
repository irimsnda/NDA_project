/**
 * Created by Kip on 4/2/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpProductsLinkageDetailsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'gmpproductslinkagedetailsabstractgrid',
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
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'GMP Product Details',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'brand_name',
                text: 'Brand Name',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'common_name',
                text: 'Common Name',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'dosage_form',
                text: 'Dosage Form',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'classification_name',
                text: 'Classification',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'shelf_life',
                text: 'Shelf Life',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'storage_condition',
                text: 'Storage Conditions',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'certificate_no',
                text: 'Certificate No',
                flex: 1
            }, {
                text: 'Options(Products Dossier Documents, Assessment Reports & Preview Details)',
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
                                text: 'Preview Product Application Details',
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Preview Record',
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Product Information',
                                winWidth: '40%',
                                isReadOnly:1,
                                handler: 'editpreviewProductInformation'
                            },
                            {
                                text: 'Preview Details',
                                iconCls: 'x-fa fa-bars',
                                appDetailsReadOnly: 1,
                                handler: 'showGmpApplicationMoreDetails'
                            },{
                                text: 'Dossier & Assessment Reports',
                                iconCls: 'x-fa fa-file',
                                tooltip: 'Application Documents',
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Application Documents',
                                winWidth: '40%',
                                isReadOnly: 1,
                                document_type_id: '',
                                handler: 'showPreviousUploadedDocs'
                            }
                        ]
                    }
                }
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
