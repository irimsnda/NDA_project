/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.PmsPlansSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'pmsplansselectiongrid',
    autoScroll: true,
    autoHeight: true,
    headers: false,
    frame: true,
    height: Ext.Element.getViewportHeight() - 225,
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
    tbar: [{
        xtype: 'hiddenfield',
        name: 'section_id'
    },{
        xtype: 'hiddenfield',
        name: 'program_id'
    },{
        xtype: 'hiddenfield',
        name: 'program_implementation_id'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'combo',
        fieldLabel: 'PROGRAM',
        labelWidth: 80,
        emptyText: 'PMS PROGRAM',
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'pms_program_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'surveillance/getPmsPrograms'
                    }
                },
                isLoad: false
            },
            afterrender: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    section_id = grid.down('hiddenfield[name=section_id]').getValue();
                store.removeAll();
                store.load({params: {section_id: section_id}});
            },
            change: function (cmbo, newVal) {
                var store = this.getStore(),
                    record = store.getById(newVal),
                    grid = this.up('grid'),
                    start_date_fld = grid.down('datefield[name=start_date]'),
                    end_date_fld = grid.down('datefield[name=end_date]');
                start_date_fld.reset();
                end_date_fld.reset();
                if (record) {
                    start_date_fld.setValue(record.get('start_date'));
                    end_date_fld.setValue(record.get('end_date'));
                }
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }, {
        xtype: 'datefield',
        emptyText: 'START DATE',
        width: 250,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'start_date',
        queryMode: 'local',
        readOnly: true,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    }, {
        xtype: 'datefield',
        emptyText: 'END DATE',
        width: 250,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'end_date',
        queryMode: 'local',
        readOnly: true,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Pms Plans',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    width: '100%',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    beforeLoad: function () {
                        var store = this.getStore(),
                            grid = this.up('grid'),
                            program_id = grid.down('combo[name=pms_program_id]').getValue(),
                            program_implementation_id= grid.down('hiddenfield[name=program_implementation_id]').getValue(),
                            section_id = grid.down('hiddenfield[name=section_id]').getValue();
                        store.getProxy().extraParams = {
                            program_id: program_id,
                            section_id: section_id,
                            program_implementation_id:program_implementation_id
                        }
                    }
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'pmsprogramplansstr',
                proxy: {
                    url: 'surveillance/getPmsProgramPlans'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'pms_program',
        text: 'PMS Program',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sampling_site',
        text: 'Sampling Site',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'category_name',
        text: 'Product Category',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product',
        text: 'Product',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        text: 'Dosage Form',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_form',
        hidden: true,
        text: 'Product Form',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'device_type',
        hidden: true,
        text: 'Device Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'strength_txt',
        text: 'Strength',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'number_of_brand',
        text: 'Number of Brands to be Collected',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'number_of_batch',
        text: 'Number of batch per brand to be Collected',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pack',
        text: 'Unit Pack',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'number_of_unitpack',
        text: 'Number of unit pack per batch to be Collected',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'total_samples',
        text: 'Total number of samples to be Collected',
        flex: 1
    }
    ]
});
