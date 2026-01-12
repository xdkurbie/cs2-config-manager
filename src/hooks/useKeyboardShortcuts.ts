import { useEffect, useCallback } from 'react';

export type KeyboardShortcut = {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
};

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatches = !!shortcut.ctrlKey === event.ctrlKey;
      const shiftMatches = !!shortcut.shiftKey === event.shiftKey;
      const altMatches = !!shortcut.altKey === event.altKey;
      const metaMatches = !!shortcut.metaKey === event.metaKey;

      if (keyMatches && ctrlMatches && shiftMatches && altMatches && metaMatches) {
        event.preventDefault();
        shortcut.action();
        break;
      }
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

// Hook for managing global shortcuts with toast notifications
export function useGlobalShortcuts(toast: any) {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'n',
      ctrlKey: true,
      action: () => {
        // Focus new config input
        const input = document.querySelector('input[placeholder*="Config"]') as HTMLInputElement;
        if (input) {
          input.focus();
          toast.info('New Config', 'Type a name and press Enter to create');
        }
      },
      description: 'Create new config'
    },
    {
      key: 'f',
      ctrlKey: true,
      action: () => {
        // Focus search input
        const input = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (input) {
          input.focus();
          toast.info('Search', 'Type to search your configs');
        }
      },
      description: 'Search configs'
    },
    {
      key: '1',
      action: () => {
        // Switch to dashboard
        const dashboardBtn = document.querySelector('button:has(span:contains("Dashboard"))') as HTMLButtonElement;
        if (dashboardBtn) {
          dashboardBtn.click();
        }
      },
      description: 'Switch to Dashboard'
    },
    {
      key: '2',
      action: () => {
        // Switch to configs
        const configsBtn = document.querySelector('button:has(span:contains("Configs"))') as HTMLButtonElement;
        if (configsBtn) {
          configsBtn.click();
        }
      },
      description: 'Switch to Configs'
    },
    {
      key: '3',
      action: () => {
        // Switch to case opening
        const casesBtn = document.querySelector('button:has(span:contains("Case Opening"))') as HTMLButtonElement;
        if (casesBtn) {
          casesBtn.click();
        }
      },
      description: 'Switch to Case Opening'
    },
    {
      key: 'd',
      shiftKey: true,
      action: () => {
        // Open donation modal
        const donateBtn = document.querySelector('button:has(span:contains("Support"))') as HTMLButtonElement;
        if (donateBtn) {
          donateBtn.click();
        }
      },
      description: 'Open donation modal'
    },
    {
      key: 'Escape',
      action: () => {
        // Close modals
        const modals = document.querySelectorAll('[role="dialog"], .fixed');
        modals.forEach(modal => {
          const closeBtn = modal.querySelector('button:has(svg:has(path[d*="M6"])), button[aria-label*="Close"]') as HTMLButtonElement;
          if (closeBtn) {
            closeBtn.click();
          }
        });
      },
      description: 'Close modal/escape'
    },
    {
      key: '?',
      shiftKey: true,
      action: () => {
        toast.info('Keyboard Shortcuts', 
          'Ctrl+N: New Config | Ctrl+F: Search | 1-3: Switch Tabs | Shift+D: Donate | Esc: Close'
        );
      },
      description: 'Show keyboard shortcuts'
    }
  ];

  useKeyboardShortcuts(shortcuts);
  return shortcuts;
}