/**
 * Created by Kip on 11/22/2018.
 */ 
Ext.define('Admin.view.document_management.views.grids.SectionSubModulesDocDefinationgrid', {
    extend: 'Ext.grid.Panel',
    controller: 'documentsManagementvctr',
    xtype: 'sectionSubModulesDocDefinationgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
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
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'sectionSubModulesDocDefinationfrm',
        winTitle: 'DMS Sections Sub-Modules Defination',
        winWidth: '40%',
        handler: 'showAddDMSSectionsDefinationDetails',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'DMS Sections Sub-Modules Defination',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = this.getStore(),
                wizardFrm = grid.up('directorateSectionsDocDefinationWizardfrm'),
                doc_section_id = wizardFrm.down('hiddenfield[name=doc_section_id]').getValue();
                store.getProxy().extraParams = {
                    doc_section_id: doc_section_id
                };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'dmssectionsSubmoduledefinationstr',
                grouper: {
                    groupFn: function (item) {
                        return item.get('module_id') + item.get('sub_module_id');
                    }
                },
                proxy: {
                    url: 'documentmanagement/getDMSSectionsSubModulesDefinationDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module Name',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'modulenode_ref',
        text: 'Module Node Reference No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'submodule_name',
        text: 'Sub-Module Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'node_ref',
        text: 'Sub-Module Reference',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'is_enabled',
        text: 'Is Enabled',
        flex: 0.2,
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
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
                    text: 'Edit Section Sub-Module Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'sectionSubModulesDocDefinationfrm',
                    winTitle: 'DMS Sections Sub-Modules Defination',
                    winWidth: '40%',
                    handler: 'showAddDMSSectionsDefinationDetails',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-trash-o',
                    tooltip: 'Delete Record',
                    table_name: 'tra_dmsdocument_sites',
                    storeID: 'dmssectionsdefinationstr',
                    action_url: 'configurations/softDeleteConfigRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteConfigWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_dmsdocument_sites',
                    storeID: 'dmssectionsdefinationstr',
                    action_url: 'documentmanagement/deleteDMSSiteDefinationDetails',
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'tra_dmsdocument_sites',
                    storeID: 'dmssectionsdefinationstr',
                    action_url: 'configurations/undoWorkflowSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteConfigWidgetParam'
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var is_enabled = rec.get('is_enabled');
            if (is_enabled === 0 || is_enabled == 0) {
                widget.down('menu menuitem[action=enable]').setDisabled(false);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(true);
            } else {
                widget.down('menu menuitem[action=enable]').setDisabled(true);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(false);
            }
        }
    }]
});
