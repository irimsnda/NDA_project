/**
 * Created by Kip on 9/13/2018.
 */
Ext.define('Admin.view.document_management.views.forms.DirectorateSectionsDocDefinationWizardfrm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.directorateSectionsDocDefinationWizardfrm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'sectionModulesDocDefinationgrid'
        },
        {
            xtype: 'sectionSubModulesDocDefinationgrid',
        },
        {
            xtype: 'sectionModulesDocTypeDefinationgrid',
           
        },
        {
            xtype: 'hiddenfield',
            name: 'doc_section_id'
        }
    ],

    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            bodyStyle: {
                "background-color": "red"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-cubes',
                    pressed: true,
                    enableToggle: true,
                    text:  'Section Modules Document Defination',
                    action: 'quickNav',
                    handler: 'quickNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-arrows',
                    enableToggle: true,
                    text: 'Section Sub-Modules Document Defination',
                    action: 'quickNav',
                    handler: 'quickNavigation'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-sitemap',
                    enableToggle: true,
                    text: 'Document Requirements Defination',
                    action: 'quickNav',
                    handler: 'quickNavigation'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Home',
                    iconCls: 'x-fa fa-backward',
                    action: 'back',
                    containerPnlXtype: 'directorateSectionsDocDefinationpnl',
                    hiddenCompXtype: 'directorateSectionsDocDefinationgrid',
                    ui: 'soft-purple',
                    handler: 'showSectionsDocDefDetailsToDashboard'
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    formBind: true,
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    action: 'next_user_card',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    formBind: true,
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    action: 'next_user_card',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
