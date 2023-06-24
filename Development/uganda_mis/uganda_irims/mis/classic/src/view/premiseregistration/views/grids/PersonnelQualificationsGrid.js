/**
 * Created by Kip on 11/8/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PersonnelQualificationsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'personnelqualificationsgrid',
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
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'button',
        text: 'Add Qualification',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_personnel',
        winTitle: 'Personnel Qualifications',
        titleSuffix: 'Qualifications',
        childXtype: 'personnelqualificationsfrm',
        winWidth: '40%',
        handler: 'showAddPersonnelQualificationFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    },{
        xtype: 'tbspacer',
        width: 50
    },{
        xtype: 'displayfield',
        value: 'Superintendent Qualifications',
        fieldStyle: {
            'font-weight':'bold',
            'color': 'green'
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Premise Personnel Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'trapersonnelqualificationsstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                panel = grid.up('panel'),
                basicInfoFrm = panel.down('premisesuperintendentfrm'),
                personnel_id = basicInfoFrm.down('hiddenfield[name=id]').getValue();
            store.getProxy().extraParams = {
                personnel_id: personnel_id
            };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    store: 'trapersonnelqualificationsstr',
    listeners:{
        afterrender: function () {
            var grid = this,
                store=grid.getStore(),
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_personnel]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            store.removeAll();
            store.load();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
                widgetCol.widget.menu.items = [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    winTitle: 'Personnel Qualifications',
                    childXtype: 'personnelqualificationsfrm',
                    winWidth: '40%',
                    handler: 'showEditPersonnelQualificationFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'tra_personnel_qualifications',
                    storeID: 'trapersonnelqualificationsstr',
                    action_url: 'premiseregistration/deletePersonnelQualification',
                    action: 'actual_delete',
                    handler: 'doDeletePremiseRegWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ];
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'registration_no',
        text: 'Registration No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'study_field',
        text: 'Field of Study',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'qualification',
        text: 'Qualification',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'institution',
        text: 'Institution',
        flex: 1
    }, {
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    winTitle: 'Personnel Qualifications',
                    childXtype: 'personnelqualificationsfrm',
                    winWidth: '40%',
                    handler: 'showEditPersonnelQualificationFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'tra_personnel_qualifications',
                    storeID: 'trapersonnelqualificationsstr',
                    action_url: 'premiseregistration/deletePersonnelQualification',
                    action: 'actual_delete',
                    handler: 'doDeletePremiseRegWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
